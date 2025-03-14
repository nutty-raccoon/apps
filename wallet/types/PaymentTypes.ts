export interface userInfo {
  id: string;
  usdBalance: number;
}

// Define types for payment options
export interface PaymentOption {
  id: string;
  name: string;
  iconSource: any;
  priority: number;
  requriresSelfVerification: boolean,
  userInfo?: userInfo;
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
