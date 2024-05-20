import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation(props) {
    const { resetOrder } = useOrderDetails();

    const handleClick = () => {
        resetOrder();
        props.setOrderPhase("inProgress");

    };

    return (
        <div>
            <h2>Thank you!</h2>
            <h3>Your order number is </h3>
            <p>As per our terms and conditions, nothing will happen now</p>
            <Button onClick={ handleClick }>Create new order</Button>
        </div>
    )
}