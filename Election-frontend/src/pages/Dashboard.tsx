import "./Dashboard.css";
import TrendChart from "../components/PartyTrendChart";
import MarginChart from "../components/MarginChart";

const Dashboard = () => {
  const marginData = [
    { year: "2009GE", margin: 27.0 },
    { year: "2011AE", margin: 9.9 },
    { year: "2014GE", margin: 35.2 },
    { year: "2016AE", margin: 38.4 },
    { year: "2021AE", margin: 9.6 },
    { year: "2024GE", margin: 7.1 },
  ];

  const trendData = [
    { year: "2011", AITC: 51.5, BJP: 3.8, CPI_M: 41.6 },
    { year: "2016", AITC: 61.6, BJP: 11.0, CPI_M: 23.2 },
    { year: "2021", AITC: 47.9, BJP: 38.3, CPI_M: 10.4 },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Election Dashboard</h1>
      <div className="dashboard-grid">
        <TrendChart
          title="Party Wise Trend (Assembly Election)"
          data={trendData}
        />
        <MarginChart data={marginData} />
      </div>
    </div>
  );
};

export default Dashboard;
