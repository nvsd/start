export const isAuthenticated = async () => {
  const user = await fetch("/me", { credentials: "include" });
  return user.ok;
};
