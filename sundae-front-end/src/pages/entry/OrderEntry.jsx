import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry(props) {
    const { totals } = useOrderDetails();

    const handleClick = () => props.setOrderPhase("review");

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
            <div>
                <Button onClick={ handleClick }>Order sundae</Button>
            </div>
        </>
    );
}