import axios from "axios";
import {
  UserRegisterAttribute,
  UserLoginAttribute,
  UserAttributes,
} from "../interfaces";

interface LoginResponse {
  sucess: string;
  token: string;
  user: UserAttributes;
}

export const loginUser = async (userData: UserLoginAttribute) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      "http://localhost:5000/api/auth/login",
      userData
    );

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("email or password is wrong");
  }
};

export const registerUser = async (userData: UserRegisterAttribute) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("cant register user");
  }
};

interface ValidationResponse {
  sucess: string;
  user: UserAttributes;
}

export const checkIfUserIsValid = async (token: string) => {
  try {
    const { data } = await axios.get<ValidationResponse>(
      "http://localhost:5000/api/auth/validate",
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
