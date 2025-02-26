
export enum PasswordErros {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWERCASE = "Lower case letter required!",
  NO_NUMBER = "At least one number required!"
}


export interface IResult {
  isValid: boolean,
  reasons: string[]
}


export class PasswordChecker {
  public checkPassword(password: string): IResult {

    const reasons : string[] = [];

    let result = {
      isValid: false,
      reasons: reasons
    }

    result.isValid = this.checkForLength(password, reasons) 
    && this.checkForNumber(password, reasons)
    && this.checkLowerCase(password, reasons)
    && this.checkUpperCase(password, reasons)
    
    return result;

  }


  private checkForLength(password: string, reasons: string[]) {
    if(password.length < 8) {
      reasons.push(PasswordErros.SHORT);
      return false
      
    };
    
    return true;
  }

  private checkForNumber(str: string, reasons: string[]) {
    const hasNumber = /\d/; 
    if(!hasNumber.test(str)){
      reasons.push(PasswordErros.NO_NUMBER)
      return false
    }
    return true;
  }
  private checkLowerCase(password: string, reasons: string[]) {
    const hasLowerCase = /[a-z]/;
    if (!hasLowerCase.test(password)) {
      reasons.push(PasswordErros.NO_LOWERCASE);
      return false;
    }
    return true;
  }
  
  private checkUpperCase(password: string, reasons: string[]) {
    const hasUpperCase = /[A-Z]/;
    if (!hasUpperCase.test(password)) {
      reasons.push(PasswordErros.NO_UPPER_CASE);
      return false;
    }
    return true;
  }
}




// orderService.js (SUT)
