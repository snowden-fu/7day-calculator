/**
 * Renders a calculator app component.
 * @returns {JSX.Element} Calculator app component.
 */
import { useEffect, useState } from "react";
import "./App.css";
import { log } from "console";

function App() {
  const [input, setInput] = useState<string>("");
  const [lastPressedWasCalculation, setLastPressedWasCalculation] =
    useState(false);

  const handleButtonClick = (value: string) => {
    const operators = ["+", "-", "*", "/"];
    const isDigit = /^[0-9]$/.test(value);
    // Check if the last character is an operator
    const lastCharIsOperator = operators.includes(input.slice(-1));

    // Check for consecutive operators and prevent them
    if (operators.includes(value) && (input === "" || lastCharIsOperator)) {
      alert(
        "Operator cannot be used as first input and cannot be used consecutively"
      );
      return;
    }
    

    // Handling decimal point logic
    if (value === ".") {
      const parts = input.split(/[\+\-\*\/]/); // Split input by operators
      const lastNumber = parts.pop(); // Get the last number entered

      if (lastNumber && lastNumber.includes(".")) {
        alert("Decimal can only be used once per number");
        return;
      }
    }

    // Append the value to the input
    setInput(input + value);

    // percentage operations
    if (value === "%") {
      try {
        const result = eval(input);
        const percentageResult = result / 100;
        setInput(percentageResult.toString());
        setLastPressedWasCalculation(true);
      } catch (error) {
        setInput("Error");
        setLastPressedWasCalculation(false);
      }
      return;
    }
    // If the last button pressed was a calculation and a new digit is pressed, start a new calculation
    console.log(lastPressedWasCalculation);
    console.log(isDigit);
    if (lastPressedWasCalculation && isDigit) {
      setInput(value);
      setLastPressedWasCalculation(false);
    } else {
      // Append the value to the input for all other cases
      setInput(input + value);
      setLastPressedWasCalculation(false);
    }
  };

  // clear the last entry
  const clearEntry = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
      console.log(input);
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator dark">
        <div className="display" data-testid="display">
          {input}
        </div>
        <div className="buttons">
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button className="operator" onClick={() => handleButtonClick("+")}>
            +
          </button>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button className="operator" onClick={() => handleButtonClick("-")}>
            -
          </button>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")} data-testid="number2">
            2
          </button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button className="operator" onClick={() => handleButtonClick("*")}>
            *
          </button>
          <button onClick={() => handleButtonClick("0")} data-testid="number0">
            0
          </button>
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button className="equal" onClick={handleCalculate}>
            =
          </button>
          <button className="operator" onClick={() => handleButtonClick("/")}>
            /
          </button>
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button onClick={() => handleButtonClick("x^2")}>
            x<sup>2</sup>
          </button>
          <button onClick={() => handleButtonClick("+-")}>+/-</button>
          <button onClick={() => handleButtonClick("sqrt")}>
            sqrt<sup>x</sup>
          </button>
          <button onClick={() => handleButtonClick("1/x")}>1/x</button>
          <button onClick={() => clearEntry()}>CE</button>
        </div>
      </div>
    </div>
  );
}

export default App;
