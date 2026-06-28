import API from "./api";

export const getProfile = async () => {
  const { data } = await API.get("/users/profile");
  return data.user;
};

export const updateProfile = async (profile) => {
  const { data } = await API.put("/users/profile", profile);
  return data.user;
};

export const changePassword = async (passwords) => {
  const { data } = await API.put(
    "/users/change-password",
    passwords
  );

  return data;
};