const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface ElectionResult {
  id: number;
  constituency: string;
  candidate: string;
  party: string;
  votes: number;
  margin?: number;
}

interface PartyStats {
  party: string;
  votes: number;
  percentage: number;
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Election Results API
export const electionApi = {
  // Get all election results
  getAllResults: async (): Promise<ElectionResult[]> => {
    return fetchApi<ElectionResult[]>("/results");
  },

  // Get results by constituency
  getResultsByConstituency: async (
    constituency: string,
  ): Promise<ElectionResult[]> => {
    return fetchApi<ElectionResult[]>(`/results/constituency/${constituency}`);
  },

  // Add new election result
  addResult: async (
    result: Omit<ElectionResult, "id">,
  ): Promise<ElectionResult> => {
    return fetchApi<ElectionResult>("/results", {
      method: "POST",
      body: JSON.stringify(result),
    });
  },

  // Update election result
  updateResult: async (
    id: number,
    result: Partial<ElectionResult>,
  ): Promise<ElectionResult> => {
    return fetchApi<ElectionResult>(`/results/${id}`, {
      method: "PUT",
      body: JSON.stringify(result),
    });
  },

  // Delete election result
  deleteResult: async (id: number): Promise<void> => {
    return fetchApi<void>(`/results/${id}`, {
      method: "DELETE",
    });
  },

  // Get party-wise statistics
  getPartyStats: async (): Promise<PartyStats[]> => {
    return fetchApi<PartyStats[]>("/stats/party");
  },

  // Get margin analysis
  getMarginAnalysis: async (): Promise<any[]> => {
    return fetchApi<any[]>("/stats/margins");
  },
};

export default electionApi;
