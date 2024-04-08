import { useState } from "react";
import "./App.css";


function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [checked, setChecked] = useState(false);
  // const nextColor = buttonColor === "red" ? "blue" : "red";
  const [nextColor, setNextColor] = useState("blue");

  const handleClick = () => {
    setButtonColor(nextColor);
    setNextColor(nextColor === "blue" ? "red" : "blue");
  }

  const handleCheckbox = () => {
    const colorBeforeDisabling = nextColor === "red" ? "blue" : "red";
    
    if (!checked) {
      setButtonColor("gray");
    } else {
      setButtonColor(colorBeforeDisabling);
    }
    setChecked(!checked);
    
  }

  return (
    <div id="container">
      <button className={buttonColor} onClick={() => handleClick()} disabled={checked} >Change to {nextColor}!</button>
      <div id="disable-button-group">
        <label htmlFor="checkbox-disable-button">Disable button</label>
        <input id="checkbox-disable-button" type="checkbox" value={checked} onChange={handleCheckbox}/>
      </div>
    </div>
  );
}

export default App;
