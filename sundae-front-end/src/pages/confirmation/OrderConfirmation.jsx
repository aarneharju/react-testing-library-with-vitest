import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation(props) {
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);
    const { resetOrder } = useOrderDetails();

    useEffect(() => {
        axios.post("http://localhost:3030/order", "no data needed for ordering")
        .then(response => setOrderNumber(response.data.orderNumber))
        .catch(error => setError(true));
    }, []);

    if(error) {
        return <AlertBanner />
    }
    
    const handleClick = () => {
        resetOrder();
        props.setOrderPhase("inProgress");

    };

    return (
        <div>
            <h2>Thank you!</h2>
            <h3>Your order number is {orderNumber ? orderNumber : "loading..."}</h3>
            <p>As per our terms and conditions, nothing will happen now</p>
            <Button onClick={ handleClick }>Create new order</Button>
        </div>
    )
}