import React from "react";

interface Result {
  id: number;
  constituency: string;
  candidate: string;
  party: string;
  votes: number;
  margin?: number;
}

interface ResultTableProps {
  results: Result[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  return (
    <div className="result-table-container">
      <h2>Election Results</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>Constituency</th>
            <th>Candidate</th>
            <th>Party</th>
            <th>Votes</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result) => (
              <tr key={result.id}>
                <td>{result.constituency}</td>
                <td>{result.candidate}</td>
                <td>{result.party}</td>
                <td>{result.votes.toLocaleString()}</td>
                <td>{result.margin ? result.margin.toLocaleString() : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-data">
                No results available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
