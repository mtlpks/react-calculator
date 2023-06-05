import { useState } from "react";
import { create, all } from "mathjs";
import './scss/_buttons.scss'

import "./App.css";

function App() {
  // display is the state that refers to the display being showed currently, while
  // calculation is the state that refers to the last calculation made.
  const [display, setDisplay] = useState("0");
  const [calculation, setCalculation] = useState([]);

  let lastButton;
  const config = {};
  const math = create(all, config);
  // This is a function that uses math.js module to evaluate the current function on display.
  const handleCalculation = (calc) => {
    console.log(calc);
    return math.evaluate(calc);
  };

  // handleNumberClick is a function that is invoked when a number is clicked. It sets display state to
  // the previous display + the button clicked (or just the button clicked if the only number on display is 0)
  const handleNumberClick = (buttonClicked) => {
    if (display == "0") {
      setDisplay(buttonClicked);
    } else {
      setDisplay((prevDisplay) => prevDisplay + buttonClicked);
    }
  };

  // handleOperationClick does a little bit more. It receives the button clicked and replaces '÷' with '/' and 'x' with '*'.
  // This is needed so that math.js properly evaluates the function, as it cannot handle the former symbols. I keep them in the UI for, well, UI purposes.
  // It also handles the invoking of the evaluation when the operation clicked is '='.
  const handleOperationClick = (buttonClicked) => {
    if (buttonClicked == "÷") {
      buttonClicked = "/";
    } else if (buttonClicked == "×") {
      buttonClicked = "*";
    }
    setDisplay((prevDisplay) => prevDisplay + buttonClicked);
    if (buttonClicked == "=") {
      setCalculation(display);
      const calc = handleCalculation(display);
      setDisplay(calc);
    }
  };

  return (
    <div className="app">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      ></link>
      <div className="container">
        <div className="row">
          <div className="screen col-12">
            <div className="screen-element calculation">{calculation}</div>
            <div className="screen-element lastClicked">{display}</div>
          </div>
        </div>
        <div className="buttons-container row">
          <div className="row">
            <div className="col-3">
              <button
                className="button btn btn-bd-control"
                onClick={() => {
                  console.log("C clicked!");
                  setCalculation([]);
                  setDisplay("0");
                }}
              >
                {"AC"}
              </button>
            </div>
            <div className="col-3">
              <button
                className="button btn btn-bd-control"
                onClick={() => {
                  if (display == "0" || display.length == 1) {
                    setDisplay("0");
                    return;
                  }
                  console.log("Backspace clicked!");
                  setDisplay(display.slice(0, -1));
                }}
              >
                <i className="bi bi-backspace"></i>
              </button>
              
            </div>
            
            <Button clickFunction={handleOperationClick} content={"%"} type="control"/>
            <Button
                  clickFunction={handleOperationClick}
                  content={"÷"}
                  type="operation"
                />
          </div>
          <div className="row">
            <Button clickFunction={handleNumberClick} content={"7"} />
            <Button clickFunction={handleNumberClick} content={"8"} />
            <Button clickFunction={handleNumberClick} content={"9"} />
            <Button
              clickFunction={handleOperationClick}
              content={"×"}
              type="operation"
            />
          </div>
          <div className="row">
            <Button clickFunction={handleNumberClick} content={"4"} />
            <Button clickFunction={handleNumberClick} content={"5"} />
            <Button clickFunction={handleNumberClick} content={"6"} />
            <Button
              clickFunction={handleOperationClick}
              content={"-"}
              type="operation"
            />
          </div>
          <div className="row">
            <Button clickFunction={handleNumberClick} content={"1"} />
            <Button clickFunction={handleNumberClick} content={"2"} />
            <Button clickFunction={handleNumberClick} content={"3"} />
            <Button
              clickFunction={handleOperationClick}
              content={"+"}
              type="operation"
            />
          </div>
          <div className="row">
            <Button
              clickFunction={handleNumberClick}
              content={"0"}
              isZero={true}
            />
            <Button
              clickFunction={handleOperationClick}
              content={"."}
            />
            <Button
              clickFunction={handleOperationClick}
              content={"="}
              type="operation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function Button({ content, clickFunction, type = "number", isZero = false }) {
  const buttonClass = `button btn btn-bd-${type}`
  // This component receives the clickFunction needed (as when being invoked). I created it to reduce arrow function repeating and improve readability. It also helps with not repeating bootstrap classNames.
  return (
    <div className={isZero ? "col-6" : "col-3"} >
      <button id={isZero ? "buttonZero" : ""}
        className={buttonClass}
        onClick={() => {
          console.log(content + " clicked!");
          clickFunction(content);
        }}
      >
        {content}
      </button>
    </div>
  );
}
