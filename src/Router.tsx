import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
