export const isAuthenticated = () => {
  const token = localStorage.getItem("autobase");
  return !!token;
};
