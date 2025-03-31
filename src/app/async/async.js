import { isValidUserName, users } from './isValid';



export async function createAccount(username) {

  const isValid = await isValidUserName(username);
  
  if (isValid) {
      throw new Error("Please enter a valid username")
  }
  const userExists =  users.includes(username);
  return new Promise((resolve, reject) => {
      if (!userExists) {
          resolve({data: {
              "userId": 1,
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

// export function fetchData() {

//   return Promise.reject({ reason: 'Operation failed '});

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const data = [1, 2, 3];
//       resolve(data);
//     })
//   })
// }










