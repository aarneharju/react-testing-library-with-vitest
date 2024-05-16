import Button from "react-bootstrap/Button";

export default function OrderConfirmation(props) {
    const handleClick = () => {
        props.setOrderPhase("inProgress");

        // TODO: Clear data so the order starts from a blank slate
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