import "./Dashboard.css";
import TrendChart from "../components/PartyTrendChart";
import MarginChart from "../components/MarginChart";

const Dashboard = () => {
  // 🔹 Assembly Trend Data
  const assemblyTrend = [
    { year: "2011", AITC: 51.5, BJP: 3.8, CPI_M: 41.6 },
    { year: "2016", AITC: 61.6, BJP: 11.0, CPI_M: 23.2 },
    { year: "2021", AITC: 47.9, BJP: 38.3, CPI_M: 10.4 },
  ];

  // 🔹 General Trend Data
  const generalTrend = [
    { year: "2009", AITC: 38.3, BJP: 3.2, CPI_M: 54.0 },
    { year: "2014", AITC: 70.1, BJP: 13.8, CPI_M: 10.9 },
    { year: "2019", AITC: 38.7, BJP: 44.7, CPI_M: 10.9 },
    { year: "2024", AITC: 47.2, BJP: 40.1, CPI_M: 10.0 },
  ];

  // 🔹 Winning Margin Data
  const marginData = [
    { year: "2009GE", margin: 27.0 },
    { year: "2011AE", margin: 9.9 },
    { year: "2014GE", margin: 35.2 },
    { year: "2016AE", margin: 38.4 },
    { year: "2021AE", margin: 9.6 },
    { year: "2024GE", margin: 7.1 },
  ];

  // 🔹 Combined Timeline
  const combinedTrend = [
    { year: "2009GE", AITC: 38.3, BJP: 3.2, CPI_M: 54.0 },
    { year: "2011AE", AITC: 51.5, BJP: 3.8, CPI_M: 41.6 },
    { year: "2014GE", AITC: 70.1, BJP: 13.8, CPI_M: 10.9 },
    { year: "2016AE", AITC: 61.6, BJP: 11.0, CPI_M: 23.2 },
    { year: "2019GE", AITC: 38.7, BJP: 44.7, CPI_M: 10.9 },
    { year: "2021AE", AITC: 47.9, BJP: 38.3, CPI_M: 10.4 },
    { year: "2024GE", AITC: 47.2, BJP: 40.1, CPI_M: 10.0 },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Election Dashboard</h1>
      <div className="dashboard-grid">
        <TrendChart
          title="Party Wise Trend (Assembly Election)"
          data={assemblyTrend}
        />
        <TrendChart
          title="Party Wise Trend (General Election)"
          data={generalTrend}
        />
        <MarginChart data={marginData} />

        <TrendChart
          title="Combined Election Trend (2009-2024)"
          data={combinedTrend}
        />
      </div>
    </div>
  );
};

export default Dashboard;
