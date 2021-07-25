import "./App.css";
import penny from "./assets/penny.jpg";
import bull from "./assets/bull.jpg";
import github from "./assets/github.png";
import twitter from "./assets/twitter.png";
import portfolio from "./assets/briefcase.png";
import { useState } from "react";

function App() {
  const [output, setOutput] = useState(false);
  const [profit, setProfit] = useState(false);
  const [bullImg, setBullImg] = useState(true);
  const [currentPrice, setCurrentPrice] = useState("");
  const [units, setUnits] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [shareProfit, setShareProfit] = useState([]);

  const happyGif = "https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif";
  const sadGif = "https://media.giphy.com/media/NTY1kHmcLsCsg/giphy.gif";

  function changeHandler(event) {
    let id = event.target.id;
    if (id === "purchase") {
      setPurchasePrice(event.target.value);
    } else if (id === "units") {
      setUnits(event.target.value);
    } else {
      setCurrentPrice(event.target.value);
    }
  }

  function checkProfitLoss() {
    setProfit(false);
    setOutput(false);
    setBullImg(true);
    let diff = Math.floor(currentPrice - purchasePrice);

    let percentage = Math.floor((diff / purchasePrice) * 100);

    let amount = Math.floor(diff * units);
    setOutput(true);
    if (diff > 0) {
      setProfit(true);
      setShareProfit([percentage, amount]);
    } else {
      setProfit(false);
      setBullImg(false);
      setShareProfit([Math.abs(percentage), Math.abs(amount)]);
    }
  }

  return (
    <div className="App">
      <div className="app-card">
        <div className="card-left">
          <h1>Check Profit/Loss on your Stock</h1>
          <input
            value={purchasePrice}
            onChange={changeHandler}
            type="number"
            id="purchase"
            placeholder="Enter Cost Price of Stock"
          />
          <label>Purchase Price</label>
          <br></br>
          <input
            value={units}
            onChange={changeHandler}
            type="number"
            id="units"
            placeholder="Enter Quantity of Stock"
          />
          <label>Stock Quantity</label>
          <br></br>
          <input
            value={currentPrice}
            onChange={changeHandler}
            type="number"
            id="current"
            placeholder="Enter Current Price of Stock"
          />
          <label>Current Price</label>
          <br></br>
          <button onClick={checkProfitLoss}>Check</button>
          {output ? (
            <div className="output">
              {profit ? (
                <p>
                  You gained {shareProfit[0]}%. Your total profit is Rs
                  {shareProfit[1]}{" "}
                </p>
              ) : (
                <p>
                  You lost {shareProfit[0]}%. Your total loss is Rs
                  {shareProfit[1]}{" "}
                </p>
              )}
              {profit ? <img src={happyGif} /> : <img src={sadGif} />}
            </div>
          ) : null}
        </div>
        {bullImg ? (
          <img src={bull} alt="bull-image" className="stock-image" />
        ) : (
          <img src={penny} alt="penny-image" className="stock-image" />
        )}
      </div>
      <footer>
        <a href="https://github.com/Launchpad5682">
          <img src={github} alt="github" />
        </a>
        <a href="https://twitter.com/saurabh22suthar">
          <img src={twitter} alt="twitter" />
        </a>
        <a href={null}>
          <img src={portfolio} alt="portfolio" />
        </a>
      </footer>
    </div>
  );
}

export default App;
