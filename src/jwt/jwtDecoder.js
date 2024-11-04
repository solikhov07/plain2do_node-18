function base64UrlDecode(str) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error("Failed to decode base64 string");
  }
}

// Function to decode a JWT without verifying the signature
function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }
  const [header, payload, signature] = parts;

  // Decode each section of the JWT
  return {
    header: base64UrlDecode(header),
    payload: base64UrlDecode(payload),
    signature,
  };
}

// Function to get and decode the refresh token from local storage
function getDecodedRefreshTokenFromLocalStorage(key) {
  const userDetails = JSON.parse(localStorage.getItem(key)); // Retrieve userDetails object from local storage
  if (userDetails && userDetails.refresh) {
    const decodedToken = decodeJWT(userDetails.refresh);
    return {
      header: decodedToken.header,
      payload: decodedToken.payload,
      signature: decodedToken.signature,
    };
  } else {
    console.error("Refresh token not found in local storage");
    return null;
  }
}

export { getDecodedRefreshTokenFromLocalStorage };
