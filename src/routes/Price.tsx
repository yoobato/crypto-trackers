import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  span:last-child {
    font-weight: 600;
    color: ${(props) => props.theme.accentColor};
  }
`;

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  tickersData: PriceData
}

const Price = () => {
  const { tickersData } = useOutletContext<PriceProps>();

  return (
    <>
      <ListItem>
        <span>Price changes (last 15 mins)</span>
        <span>{tickersData.quotes.USD.percent_change_15m}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 30 mins)</span>
        <span>{tickersData.quotes.USD.percent_change_30m}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 1 hour)</span>
        <span>{tickersData.quotes.USD.percent_change_1h}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 6 hours)</span>
        <span>{tickersData.quotes.USD.percent_change_6h}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 12 hours)</span>
        <span>{tickersData.quotes.USD.percent_change_12h}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 24 hours)</span>
        <span>{tickersData.quotes.USD.percent_change_24h}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 7 days)</span>
        <span>{tickersData.quotes.USD.percent_change_7d}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 30 days)</span>
        <span>{tickersData.quotes.USD.percent_change_30d}%</span>
      </ListItem>
      <ListItem>
        <span>Price changes (last 1 year)</span>
        <span>{tickersData.quotes.USD.percent_change_1y}%</span>
      </ListItem>
    </>
  );
};

export default Price;
