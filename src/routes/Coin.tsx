import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { PriceData } from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const BackButton = styled(Link)`
  width: 32px;
  height: 32px;
  display: flex;
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-left: 24px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  state : {
    name: string;
  }
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;

  // 우리가 특정 URL에 있는지를 알려준다. (v5에서는 useRouteMatch 였음.)
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  // QueryKey는 Array 이다. (Array의 값이 고유하면 되나봄.)
  // 아래처럼 useQuery의 반환값의 이름을 바꿔서 가져올 수 있다. (isLoading: isLoading)
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId!], 
    () => fetchCoinInfo(coinId!)
  );
  // fetcher function에 파라미터 넣어야 할 때는 아래와 같이 익명함수 만들어서 한다.
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId!], 
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  // refetch 할 수도 있다.

  const loading = infoLoading || tickersLoading;

  // TODO: 뒤로가기 버튼

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackButton to="/">&larr;</BackButton>
        <Title>
          {/* state.name이 있으면 state.name 보여주고 */}
          {/* 로딩중이면 "Loading" 보여주고 */}
          {/* Detail API 통해 받아온거면 info.name 보여준다. */}
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD?.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>
 
          {/* 자식 Routes를 가지고 온다 */}
          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
};

export default Coin;
