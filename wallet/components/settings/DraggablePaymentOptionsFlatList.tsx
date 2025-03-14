import { PaymentOption } from "@/types/PaymentTypes";
import { Dispatch, SetStateAction, useState } from "react";
import PaymentOptionItem from "./PaymentOptionItem";
import PaymentOptionModal from "./PaymentOptionModal";
import {
  StyleSheet,
  View,
} from 'react-native';
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

interface DraggablePlaymentOptionsFlatListProps {
  paymentOptions: PaymentOption[],
  setPaymentOptions: Dispatch<SetStateAction<PaymentOption[]>>,
  isSelfVerified: boolean
}

export default function DraggablePaymentOptionsFlatList({ paymentOptions, setPaymentOptions, isSelfVerified }: DraggablePlaymentOptionsFlatListProps) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Handler for payment option press
  const handlePaymentOptionPress = (item: PaymentOption) => {
    setSelectedPaymentOption(item);
    setIsModalVisible(true);
  };

  // Handler for modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Render each payment option item
  const renderItem = (info: DragListRenderItemInfo<PaymentOption>) => {
    const { item, onDragStart, isActive } = info;
    const isDisabled = (!isSelfVerified && item.requriresSelfVerification) || !item.userInfo;

    return (
      <PaymentOptionItem
        item={item}
        drag={onDragStart}
        isActive={isActive}
        disabled={isDisabled}
        onPress={handlePaymentOptionPress}
      />
    );
  };

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...paymentOptions]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos

    copy.forEach((value, idx) => value.priority = idx + 1)

    setPaymentOptions(copy);
  }

  return (
    <View style={styles.listContainer}>
      <DragList
        data={paymentOptions}
        onReordered={onReordered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={true}
        contentContainerStyle={styles.dragListContent}
      />

      <PaymentOptionModal
        isVisible={isModalVisible}
        paymentOption={selectedPaymentOption}
        onClose={handleModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dragListContent: {
    paddingBottom: 80, // Add some padding at the bottom to ensure the last items are visible above the navbar
  }
});
