// const baseUrl = "https://rashtan-flowerbook-api.azurewebsites.net/api/";
const appUrl = "https://rashtan-flowerbook.azurewebsites.net/";
const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:44309/api/";
// const appUrl = "http://localhost:8100/";

export { baseUrl, appUrl };
