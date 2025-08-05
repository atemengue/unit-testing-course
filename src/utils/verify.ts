function verifyName(name: string): boolean {
  return name.length >= 8;
}

function verifyPassword(password: string): boolean {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber;
}

function verifyEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function verify(name: string, password: string, email: string): boolean {
  return verifyName(name) && verifyPassword(password) && verifyEmail(email);
}
export { verify, verifyEmail, verifyName, verifyPassword };
