export const fetchOperationType = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/operation-type/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Response || !Array.isArray(data.Response)) {
      throw new Error("Unexpected API response: Response is not an array");
    }

    return data.Response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const fetchCounterParty = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt/counter-party/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Response || !Array.isArray(data.Response)) {
      throw new Error("Unexpected API response: Response is not an array");
    }

    return data.Response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
