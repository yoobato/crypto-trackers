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

  // TODO: 캔들스틱 차트로 변경

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart 
          type="line" 
          series={[
            { 
              name: "Price", 
              data: data?.map((price) => price.close),
            },
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
            stroke: {
              curve: "smooth",
              width: 4,
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: false 
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`
              },
            },
          }} 
        />
      )}
    </div>
  );
};

export default Chart;
