import React, { useState } from "react";

interface ElectionFormProps {
  onSubmit?: (data: ElectionData) => void;
}

interface ElectionData {
  constituency: string;
  candidate: string;
  party: string;
  votes: number;
}

const ElectionForm: React.FC<ElectionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ElectionData>({
    constituency: "",
    candidate: "",
    party: "",
    votes: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "votes" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="election-form">
      <h2>Election Form</h2>
      <div className="form-group">
        <label htmlFor="constituency">Constituency:</label>
        <input
          type="text"
          id="constituency"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="candidate">Candidate:</label>
        <input
          type="text"
          id="candidate"
          name="candidate"
          value={formData.candidate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="party">Party:</label>
        <input
          type="text"
          id="party"
          name="party"
          value={formData.party}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="votes">Votes:</label>
        <input
          type="number"
          id="votes"
          name="votes"
          value={formData.votes}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ElectionForm;
