export function registerUser(user, sendMail) {
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