import { useState } from "react";
import "./App.css";

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const [checked, setChecked] = useState(false);
  // const nextColor = buttonColor === "red" ? "blue" : "red";
  const [nextColor, setNextColor] = useState("midnight-blue");

  const handleClick = () => {
    setButtonColor(nextColor);
    setNextColor(nextColor === "midnight-blue" ? "medium-violet-red" : "midnight-blue");
  }

  const handleCheckbox = () => {
    const colorBeforeDisabling = nextColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
    
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
