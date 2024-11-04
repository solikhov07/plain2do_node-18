export const fetchCountries = async () => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt-country/`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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

export const fetchProjects = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt/project/`, {
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

export const fetchDormitories = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/dormitory/`, {
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

export const fetchDoc = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/permitdoc/cat/`, {
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

export const fetchCitizenship = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/citizenship/`, {
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

export const fetchCompany = async (token) => {
  const urlLink = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${urlLink}/gendt/company/`, {
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
