import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry() {
    const { totals } = useOrderDetails();

    return (
        <>
            <div>
                <Options optionType="scoops" />
                <Options optionType="toppings" />
            </div>
            <div>
                <h2>
                    Grand Total: { formatCurrency(totals.scoops + totals.toppings) }
                </h2>
            </div>
        </>
    );
}