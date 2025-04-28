import { sendMail } from "../libs/sendMail.js";

export function registerUser(user) {
  if(!user) {
      return {
          status: 400,
          message: "User data is required"
      }
  } else {
    sendMail(user.email, user.name);
    return {
        status: 200,
        message: "User registered successfully"
  }
}
}