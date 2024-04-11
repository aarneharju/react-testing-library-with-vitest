import axios from "axios";
import { useState, useEffect } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    // Option type is 'scoops' or 'toppings'
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(response => {
            setItems(response.data);
            console.log({items});
        })
        .catch(error => {
            // TODO: Handle error response
        });
    }, [optionType]);

    // TODO: Replace 'null' with ToppingOption when available
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;
    
    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return <Row>{optionItems}</Row>;
}