export const fetchPositions = async (token) => {
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

    if (!data.Position || !Array.isArray(data.Position)) {
      throw new Error("Unexpected API response: Response is not an array");
    }

    return data.Position;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
};
