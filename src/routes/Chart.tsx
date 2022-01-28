import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = () => {
  // useParams를 써도 된다.
  const { coinId } = useOutletContext<ChartProps>();
  
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId], 
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const isDark = useRecoilValue(isDarkAtom);

  const makeChartItem = (item: IHistorical) => {
    const date = new Date(item.time_close);

    const x = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const y = [
      item.open.toFixed(2),
      item.high.toFixed(2),
      item.low.toFixed(2),
      item.close.toFixed(2),
    ];

    return { x, y };
  };

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart 
          type="candlestick"
          series={[
            {
              data: data?.map((item) => makeChartItem(item))
            }
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },
          }} 
        />
      )}
    </div>
  );
};

export default Chart;
