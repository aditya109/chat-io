const loginMainfest = {
    "error-messages": {
        "username-input-validation-failure": [
            {
                "id": "invalid-email-in-username",
                "message": "Enter a valid email address or provide a username"
            },
            {
                "id": "valid-email-in-username",
                "message": ""
            }
        ],
        "password-validation-failure": [
            {
                "id": "empty-password",
                "message": "Empty Password entered."
            },
            {
                "id": "password-length-not-within-8-and-15",
                "message": "Password has to be atleast 8 characters-the more characters, the better, less than 15 characters."
            },
            {
                "id": "password-without-uppercase",
                "message": "Password does not contain any uppercase letters, must contain atleast 1 uppercase letter."
            },
            {
                "id": "password-without-lowercase",
                "message": "Password does not contain any lowercase letters, must contain atleast 1 lowercase letter."
            },
            {
                "id": "password-without-digits",
                "message": "Password does not contain any digits, must contain atleast 1 digit."
            },
            {
                "id": "password-without-symbols",
                "message": "Password does not contain any symbols, must contain atleast 1 special symbol."
            },
            {
                "id": "valid-password",
                "message": ""
            }
        ]
    }
}

const findWarningMessageFromFailCaseListInConfig = (params) => {
    return params.failCases.find((failCase) => {
        return failCase[params.matchProperty] == params.matchPropertyValue
    })[params.requiredProperty]
}

// triggering `login-form` form submission
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (event) => {

    // capturing the `username-input`
    const usernameInput = getHTMLObject("username-input");
    let usernameFieldValue = getValueFromTMLObject(usernameInput);

    // capturing the `password-input`
    const passwordInput = getHTMLObject("password-input");
    let passwordFieldValue = getValueFromTMLObject(passwordInput);

    let usernameAsEmailValidationResult = null;
    if (usernameFieldValue.includes("@")) {
        usernameAsEmailValidationResult = isUsernameFieldValidIfInputIsEmail(usernameFieldValue);
        if (!usernameAsEmailValidationResult.isValid) {
            alert(usernameAsEmailValidationResult.message);
        }
    }
    if (usernameAsEmailValidationResult == null || (usernameAsEmailValidationResult != null && usernameAsEmailValidationResult.isValid)) {
        passwordValidationResult = validatePassword(passwordFieldValue);
        if (!passwordValidationResult.isValid) {
            alert(passwordValidationResult.message)
        } else {
            console.log("Username and Password are valid")
        }
    }
    setInputValue(passwordInput);
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

const isUsernameFieldValidIfInputIsEmail = (val) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (val.match(mailformat)) {
        return {
            isValid: true,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["username-input-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "invalid-email-in-username",
                requiredProperty: "message"
            })
        };
    } else {
        return false;
    }
}

const validatePassword = (password) => {
    // RULE 1: checking if password field is empty
    uppercaseRegex = /[A-Z]/
    lowercaseRegex = /[a-z]/
    digitRegex = /[0-9]/
    symbolRegex = /[^A-Za-z0-9]/
    // RULE 1: checking if password field is empty

    if (password.length == 0) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "empty-password",
                requiredProperty: "message"
            })
        }
    }
    // RULE 2: checking if password field length is between 8 and 15 characters
    else if (password.length < 8 && password.length > 15) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "password-length-not-within-8-and-15",
                requiredProperty: "message"
            })
        }
    }
    // RULE 3: checking if password field contains uppercase characters
    else if (!password.match(uppercaseRegex)) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "password-without-uppercase",
                requiredProperty: "message"
            })
        }
    }
    // RULE 4: checking if password field contains lowercase characters
    else if (!password.match(lowercaseRegex)) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "password-without-lowercase",
                requiredProperty: "message"
            })
        }
    }
    // RULE 5: checking if password field contains digits
    else if (!password.match(digitRegex)) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "password-without-digits",
                requiredProperty: "message"
            })
        }
    }
    // RULE 6: checking if password field contains special characters
    else if (!password.match(symbolRegex)) {
        return {
            isValid: false,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "password-without-symbols",
                requiredProperty: "message"
            })
        }
    }
    else {
        // password-text should be a valid password
        return {
            isValid: true,
            message: findWarningMessageFromFailCaseListInConfig({
                failCases: loginMainfest["error-messages"]["password-validation-failure"],
                matchProperty: "id",
                matchPropertyValue: "valid-password",
                requiredProperty: "message"
            })
        }
    }
}