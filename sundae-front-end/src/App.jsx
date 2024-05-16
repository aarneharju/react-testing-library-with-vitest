import { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const showCorrectPageComponentDependingOnOrderPhase = () => {
    let pageComponent = <OrderEntry setOrderPhase={ setOrderPhase } />;
    
    switch (orderPhase) {
      case "inProgress":
        pageComponent = <OrderEntry setOrderPhase={ setOrderPhase } />;
        break;
    
      case "review":
        pageComponent = <OrderSummary setOrderPhase={ setOrderPhase } />;
        break;
    
      case "complete":
        pageComponent = <OrderConfirmation setOrderPhase={ setOrderPhase } />;
        break;
    
      default:
        pageComponent = <OrderEntry setOrderPhase={ setOrderPhase } />;
        break;
    }

    return pageComponent;
  };
  
  return (
    <Container>
      <OrderDetailsProvider>
        { showCorrectPageComponentDependingOnOrderPhase() }
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;