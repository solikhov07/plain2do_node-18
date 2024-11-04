// Import necessary modules
import { getDecodedRefreshTokenFromLocalStorage } from "../../../jwt/jwtDecoder";
import { rolesPermissions, defaultPermissions } from "./permission";

// Function to get the user type and corresponding permissions
export const getUserPermissions = (section) => {
  const decodedToken = getDecodedRefreshTokenFromLocalStorage("userDetails");
  const userType = decodedToken?.payload?.user_type?.toLowerCase() || null;

  const effectiveUserType = userType || "system admin";

  return (
    rolesPermissions[effectiveUserType]?.[section] ||
    defaultPermissions[section]
  );
};
