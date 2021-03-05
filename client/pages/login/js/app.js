// triggering `login-form` form submission
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (event) => {

    // capturing the `username-input`
    const usernameInput = getHTMLObject("username-input");
    let usernameFieldValue = getValueFromTMLObject(usernameInput);

    // capturing the `password-input`
    const passwordInput = getHTMLObject("password-input");
    let passwordFieldValue = getValueFromTMLObject(passwordInput);
    setInputValue(passwordInput);

    if (usernameFieldValue.includes("@")) {
        if (!validateUsernameInputAsEmail(usernameFieldValue)) {
            console.log("Enter a valid email address or provide a username");
        }
    } else {
        console.log(usernameFieldValue, passwordFieldValue);
        console.log("sending username and password to POST API");
    }

    
})

const getHTMLObject = (id) => {
    return document.getElementById(id);
}

const setInputValue = (object, value = "") => {
    object.value = value
}

const getValueFromTMLObject = (object) => {
    return object.value
}

const validateUsernameInputAsEmail = (val) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (val.match(mailformat)) {
        console.log("Valid email address !");
        return true;
    } else {
        console.log("Invalid email address !");
        return false;
    }
}

const validatePassword = (password) => {
    // RULE 1: checking if password field is empty
    uppercaseRegex = /[A-Z]/
    lowercaseRegex = /[a-z]/
    digitRegex = /[0-9]/
    

    if (password.length == 0) 
        return False, "Empty Password entered"
    if (password.length >= 8 && password.length <= 15)
        return False, "Password has to be atleast 8 characters-the more characters, the better, less than 15 characters"
    if (password.length ) 
}