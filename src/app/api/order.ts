import { v4 as uuidv4 } from "uuid";

interface OrderDetails {
  productName: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
}

const saveOrderToDatabase = async (order: OrderDetails) => {
  console.log("Order saved to database:", order);
};

export const placeOrder = async (orderDetails: OrderDetails) => {
  const trackingNumber = uuidv4();
  const orderWithTracking = {
    ...orderDetails,
    trackingNumber,
    status: "Processing",
  };

  await saveOrderToDatabase(orderWithTracking);

  return orderWithTracking;
};
