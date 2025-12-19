export const checkValidData = (email, password) => {
const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

//Function returns error message

if(!isEmailValid) return "Email Id is not valid";
if(!isPasswordValid) return "Incorrect password";

return null;

}