export function verifyPassword(passwordInTxt){
  return /[A-Z]/.test(passwordInTxt) && /[a-z]/.test(passwordInTxt) && /[0-9]/.test(passwordInTxt) && /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(passwordInTxt)
}