// Define types for payment options
export interface PaymentOption {
  id: string;
  name: string;
  iconSource: any;
  priority: number;
  usdBalance: number;
  requriresSelfVerification: boolean,
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
