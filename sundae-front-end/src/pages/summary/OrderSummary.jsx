import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary(props) {
    const { totals, optionCounts } = useOrderDetails();
    const scoopArray = Object.entries(optionCounts.scoops); // [["Chocolate", 2], ["Vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={ key } >
            { value } { key }
        </li>
    ));
    const toppingsArray = Object.entries(optionCounts.toppings); // ["M&Ms", "Gummi bears"]
    const toppingList = toppingsArray.map(topping => <li key={ topping } >{ topping }</li> )

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: { formatCurrency(totals.scoops) }</h2>
            <ul>
               { scoopList }
            </ul>
            <h2>Toppings:</h2>
            <ul>
                { toppingList }
            </ul>
            <h2>Toppings: { formatCurrency(totals.toppings) }</h2>
            <SummaryForm setOrderPhase={props.setOrderPhase} />
        </div>
    )
}