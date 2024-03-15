import API from "@/api";
import { decodeToken } from "react-jwt";

export const getUser = async (token) => {
  const DecodedToken = decodeToken(token);

  return DecodedToken?.user_metadata;
};

export const signUp = async (values) => {
  try {
    const response = await API.post("/auth/signup", values);

    return response;
  } catch (err) {
    return err.response;
  }
};

export const signIn = async (values) => {
  try {
    const response = await API.post("/auth/signin", values);

    return response;
  } catch (err) {
    return err.response;
  }
};
