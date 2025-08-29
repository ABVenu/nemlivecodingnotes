import { apiPost, apiRequest } from "./apiClient";


export const getUsers = () => apiRequest("/users");

// export const login = (credentials) =>
//   apiRequest("/login", {
//     method: "POST",
//     body: JSON.stringify(credentials),
//   });



export const signup = (data) => apiPost("/users",data)