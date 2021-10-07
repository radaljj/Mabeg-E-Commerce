import { Customer } from "./customer";
import { Address } from "./address";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {

    customer:Customer;
    billingAdresa:Address;
    shippingAdresa:Address;
    order:Order;
    orderItems:OrderItem[];
    

}
