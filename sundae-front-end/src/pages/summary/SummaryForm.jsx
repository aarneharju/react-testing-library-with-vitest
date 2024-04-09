import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = () => {
    const [checkedTermsAndConditions, setCheckedTermsAndConditions] = useState(false);

    const checkboxLabel = (
        <span>
            I agree to <span style={{ color: "blue" }} >Terms and Conditions</span>
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