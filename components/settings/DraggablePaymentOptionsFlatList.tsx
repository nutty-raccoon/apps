import { PaymentOption } from "@/types/PaymentTypes";
import { Dispatch, SetStateAction } from "react";
import PaymentOptionItem from "./PaymentOptionItem";
import { 
  StyleSheet,
} from 'react-native';
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

interface DraggablePlaymentOptionsFlatListProps{
  paymentOptions: PaymentOption[],
  setPaymentOptions: Dispatch<SetStateAction<PaymentOption[]>>,
  isSelfVerified: boolean
}

export default function DraggablePaymentOptionsFlatList({paymentOptions, setPaymentOptions, isSelfVerified}: DraggablePlaymentOptionsFlatListProps) {

  // Render each payment option item
  const renderItem = (info: DragListRenderItemInfo<PaymentOption>) => {
    const {item, onDragStart, isActive} = info;
    const isDisabled = !isSelfVerified && item.requriresSelfVerification;

    return (
      <PaymentOptionItem
        item={item}
        drag={onDragStart}
        isActive={isActive}
        disabled={isDisabled}
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
        <DragList
          data={paymentOptions}
          onReordered={onReordered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16
  }
});