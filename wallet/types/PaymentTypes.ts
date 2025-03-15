export interface PendingPayment {
  amount: number;
  txId: `0x${string}`,
}

export interface userInfo {
  id: string;
}

// Define types for payment options
export interface PaymentOption {
  id: string;
  name: string;
  iconSource: any;
  priority: number;
  requriresSelfVerification: boolean,
  userInfo: userInfo | null;
  usdBalance: number;
  pendingPayment: PendingPayment | null,
}

// Define type for dragging state
export interface DraggingState {
  index: number | null;
  startY: number;
}

// Define type for item position tracking
export interface ItemPosition {
  y: number;
  height: number;
}
