
import { useState } from "react";
import './App.css';

function App() {

   const initialPrice = 100;
  const [price, setPrice] = useState(initialPrice); // javascript
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState(0);
  const [shares, setShares] = useState(10);
  const [cash, setCash] = useState(10000);
  const [error, setError] = useState(" ");
  const [days, setDay] = useState(1);
  const [history, setHistory] = useState([]);


  function simulate() {
    //are you buying or selling
    setError("");
    let quantityInt = parseInt(quantity);
    if (tradeType === "buy" && quantityInt > 0 && cash >= quantityInt * price) {
      setShares(shares + quantityInt);
      setCash(cash - quantityInt + price);
      // history
      const message = `Day ${days}: Bought ${quantityInt} $SPY at ${price.toFixed(
        2
      )}`;
      setHistory([
        <div>
          <div>{message}</div>
          <br></br>
        </div>,
        ...history
      ]);
    } else if (tradeType === "buy" && cash > quantityInt * price) {
      setError("Not enough cash to buy stock");
    } else if (tradeType === "sell" && shares >= quantityInt) {
      setShares(shares - quantityInt);
      setCash(cash + quantityInt * price);
    } else if (tradeType === "sell" && cash > quantityInt * price) {
      setError("Not Enough Share of stock");
    } else if (
      tradeType === "sell" &&
      quantityInt > 0 &&
      shares >= quantityInt
    ) {
      // Sell
      setShares(shares - quantityInt);
      setCash(cash + quantityInt * price);
      const message = `Day ${days}: Sold ${quantityInt} $SPY at ${price.toFixed(
        2
      )}`;
      // you MUST use setHistory to change history
      setHistory([<div>{message}</div>, ...history]);
    } else if (tradeType === "sell" && shares < quantityInt) {
      setError("Not enough shares of stock");
    }

    setDay(days + 1);
    setPrice(price + 5 * (0.5 - Math.random()));
  }


  function onTradeTypeChange(e) {
    setTradeType(e.target.value);
  }

  function onQuantityChange(e) {
    setQuantity(e.target.value);
  }

  return (
    <div className="App">
      <>
      <h1 id="title">Trading Simulator App</h1>
      <h2>Day: {days}</h2>
      <table>
        <tbody>
          <tr>
            <th>Stock</th>
            <th>Price</th>
            <th>Shares</th>
            <th>Total</th>
            <th>Action</th>
            <th>Quantity</th>
          </tr>

          <tr>
            <td>$SPY</td>
            <td>{price.toFixed(2)}</td>
            <td>{shares}</td>
            <td>{(shares * price).toFixed(2)}</td>
            <td>
              <select value={tradeType} onChange={onTradeTypeChange}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </td>
            <td>
              <input value={quantity} onChange={onQuantityChange}></input>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={simulate}>Simulate!</button>
      <div>Cash: ${cash.toFixed(2)}</div>
      <br></br>
      <h3>History:</h3>
      <div id="history">{history}</div>
      <br></br>
      <div>{error}</div>
    </>
    </div>
  );
}

export default App;
