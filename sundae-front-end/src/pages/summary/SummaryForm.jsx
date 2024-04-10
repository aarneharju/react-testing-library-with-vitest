import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const SummaryForm = () => {
    const [checkedTermsAndConditions, setCheckedTermsAndConditions] = useState(false);

    const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Terms and conditions</Popover.Header>
        <Popover.Body>
            No ice cream will actually be delivered.
        </Popover.Body>
    </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to 
            <OverlayTrigger trigger={"hover"} placement="right" overlay={popover}>
                <span style={{ color: "blue" }} > Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    );

    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={checkedTermsAndConditions}
                    onChange={(event) => setCheckedTermsAndConditions(event.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!checkedTermsAndConditions}>Confirm order</Button>
        </Form>
    )
}

export default SummaryForm;