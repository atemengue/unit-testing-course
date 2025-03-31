
async function isValidUserName(userName) {
  // Placeholder for request checking if username is valid
  if (!userName || !userName.includes('@')) {
      return false;
  }
  else{
      return true;
  }
}

async function createAccount(username) {
  if (!isValidUserName(username)) {
      throw exception.InvalidUsernameError("Please enter a valid username")
  }
  const userExists = await users.userExists(username);
  return new Promise((resolve, reject) => {
      if (!userExists) {
          resolve({data: {
              "userId": users.createUserId(),
              "username": username,
          }}) 
      } else {
          reject("User already exists")
      }
     
  })
}

export function fetchData() {

  return Promise.reject({ reason: 'Operation failed '});

}











