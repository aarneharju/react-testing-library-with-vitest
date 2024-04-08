import { useState } from "react";
import "./App.css";


function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [checked, setChecked] = useState(false);
  const nextColor = buttonColor === "red" ? "blue" : "red";
  
  const handleCheckbox = () => {
    setChecked(!checked);
  }

  return (
    <div id="container">
      <button className={buttonColor} onClick={() => setButtonColor(nextColor)} disabled={checked} >Change to {nextColor}!</button>
      <div id="disable-button-group">
        <label htmlFor="checkbox-disable-button">Disable button</label>
        <input id="checkbox-disable-button" type="checkbox" value={checked} onChange={handleCheckbox}/>
      </div>
    </div>
  );
}

export default App;
