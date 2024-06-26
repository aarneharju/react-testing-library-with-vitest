import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useState } from "react";

export default function ScoopOption({name, imagePath}) {
    const { updateItemCount } = useOrderDetails();
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event) => {
        const currentValue = event.target.value;

        // Make sure we're using a number, not a string to validate
        const currentValueFloat = parseFloat(currentValue);

        // Check validity
        const valueIsValid = 
            0 <= currentValueFloat &&
            currentValueFloat <= 10 &&
            Math.floor(currentValueFloat) === currentValueFloat; // Check that the value is integer, not a decimal number
        
        // Validate
        setIsValid(valueIsValid);

        if(valueIsValid) {
            updateItemCount(name, parseInt(event.target.value),"scoops");
        } else {
            updateItemCount(name, 0, "scoops");
        }
    };


    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
            <img style={{ width: "75%"}} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
            <Form.Group
                controlId={`${ name }-count`}
                as={Row}
                style={{ marginTop: "10px"}}
            >
                <Form.Label column xs="6" style={{ textAlign: "right"}}>
                    { name }
                </Form.Label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control 
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={!isValid}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}