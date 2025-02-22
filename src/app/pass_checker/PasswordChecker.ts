

export class PasswordChecker {
  public checkPassword(password: string): boolean {

    let isValid: boolean = false;


    isValid = this.checkForLength(password) 
    && this.checkForNumber(password)
    && this.checkLoweCase(password)
    && this.checkUpperCase(password)
    
    return isValid;

  }


  private checkForLength(password: string) {
    if(password.length < 8) {
      return false
    };
    return true;
  }

  private checkForNumber(str: string) {
    const hasNumber = /\d/; 
    if(!hasNumber.test(str)){
      return false
    }
    return true;
  }

  private checkLoweCase(password: string) {
    if(password === password.toLowerCase()){
      return false;
    }
    return true;
  }
  private checkUpperCase(password: string){
    if(password === password.toUpperCase()){
      return false
    }
    return true;
  }
}