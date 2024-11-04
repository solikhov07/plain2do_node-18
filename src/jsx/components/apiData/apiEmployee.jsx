export const fetchEmployee = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/employee/`, {
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

export const fetchEmployeeById = async (token, id) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/employee/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if data is an object and contains the expected properties
    if (typeof data === "object" && data !== null) {
      return data; // Return the object directly or handle it as needed
    } else {
      throw new Error("Unexpected API response: Data is not an object");
    }
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return null; // Return null or handle it as appropriate
  }
};

export const fetchWorkSchedule = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/work-schedule/`, {
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

export const fetchPaymentType = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/payment-type/`, {
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

export const fetchCurrency = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt-currency/`, {
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

export const fetchJobs = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt/job-title/`, {
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
