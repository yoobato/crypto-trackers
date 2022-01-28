// fetcher function (fetch 하는 함수)
// fetcher function은 Promise를 리턴한다.

const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`)
    .then((response) => response.json());
};

export const fetchCoinInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((response) => response.json());
};

export const fetchCoinTickers = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((response) => response.json());
};

export const fetchCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  // endDate 에서 2주일 전
  const startDate = endDate - (60 * 60 * 24 * 7 * 2);

  // ohlcv = (open, high, low, close, volume)
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
    .then((response) => response.json());
};
