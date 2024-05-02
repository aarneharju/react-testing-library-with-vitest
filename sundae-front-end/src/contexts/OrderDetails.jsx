import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// Create a custom hook to check whether we're in a provider
export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);
    
    if (!contextValue) {
        throw new Error("useOrderDetails must be called from within an OrderDetailsProvider");
    }

    return contextValue;
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: {}, // for example { Chocolate: 1, Vanilla: 2 }
        toppings: {} // for example { "Gummi Bears": 1 } <- need quotes because of the space 
    });

    function updateItemCount(itemName, newItemCount, optionType) {
        // Make a copy of the existing state (so that you're not mutating it in place)
        const newOptionCounts = { ...optionCounts };

        // Update the copy with the new information
        newOptionCounts[optionType][itemName] = newItemCount;

        // Update the state with the updated copy
        setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
        setOptionCounts({ scoops: {}, toppings: {} });
    }

    // Utility function to derive totals from optionCounts state value
    function calculateTotal(optionType) {
        // Get an array of counts for the option type (for example, [1, 2])
        const countsArray = Object.values(optionCounts[optionType]);

        // Total the values in the array of counts for the number of items
        const totalCount = countsArray.reduce((total, currentValue) => total + currentValue, 0);
        
        // Multiply the total number of items by the price for this item type
        return totalCount * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings")
    }

    const value = { optionCounts, totals, updateItemCount, resetOrder };
    return <OrderDetails.Provider value={value} {...props} />; 
}
