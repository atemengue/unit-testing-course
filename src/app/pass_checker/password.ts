import { passwordChecker } from '../others/password';
import { IResult } from './PasswordChecker';


export enum PasswordErros {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWERCASE = "Lower case letter required!",
  NO_NUMBER = "At least one number required!"
}

export interface IR {
  isValid: boolean,
  reasons: string[]
}


export class PasswordClass {

  public checker(password: string): IResult{

    let reasons: string[] = [];
    let isValid: boolean = true;

    if (password.length < 8) {
      isValid = isValid && false;
      reasons.push(PasswordErros.SHORT);
      
    };

    if(!/[A-Z]/.test(password)){
    isValid = isValid && false
    reasons.push(PasswordErros.NO_UPPER_CASE);
    }

    if(!/[a-z]/.test(password)){
      isValid = isValid && false
      reasons.push(PasswordErros.NO_LOWERCASE);
      }

    if(!/\d/.test(password)){
      isValid = isValid && false;
      reasons.push(PasswordErros.NO_NUMBER)
    }

    return { isValid: isValid, reasons }
  }
}