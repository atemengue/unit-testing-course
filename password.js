export function passwordChecker(password = "") {
  if (password.length < 8){
    return "invalid password";
  }

  if(password === password.toLowerCase()){
    return "invalid password";
  }

  if(password === password.toUpperCase()){
    return "invalid password";
  }


  return "password valid"
  
}

