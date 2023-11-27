import { validateUniqueUsernameApi } from "@/api/authentication";
/*
 * Some constants
*/


/**
 * The Login Base Rules
*/
const loginBaseRules = {
    username: [
        (username) => {
            if (username && !username.includes(' ')) return true;
            return "Please enter a valid username."
        }
    ],
    password: [
        (password) => {
            if (password && !password.includes(' ')) return true;
            return "Please enter a valid password."
        }
    ]
}

/**
 * The Sign up Base Rules
*/
const signupUsernameRules = [
    (username) => {
        if (username) return true;
        return "Please enter a username."
    },
    (username) => {
        if (!username.includes(' ')) return true;
        return "Username cannot contain spaces";
    },
    (username) => {
        if (username.length > 3) return true;
        return "Username must be greater than 3 characters long";
    },
    async (username) => {
        const { data: isUnique, error } = await validateUniqueUsernameApi(username);
        if (error) {
            console.error(error);
            return `Could not validate unique username. ${error.code}`
        }
        if (isUnique) return true;
        return "Username already exists, try another!.";
    }
];
const signUpPasswordRules = [
    (password) => {
        if (!password.includes(' ')) return true;
        return "Password cannot contain spaces";
    },
    (password) => {
        if (password.length >= 8) return true;
        return "Password must be at least 8 characters."
    },
    (password) => {
        if (/[a-z]/.test(password)) return true;
        return "Password must contain at least one lowwercase letter";
    },
    (password) => {
        if (/[A-Z]/.test(password)) return true;
        return "Password must contain at least one uppercase letter"
    },
    (password) => {
        if (/\d/.test(password)) return true;
        return "Password must contain at least one number";
    }
];
const signupBaseRules = {
    username: signupUsernameRules,
    password: signUpPasswordRules
}

const config = {
    // Form base rules for login/signup
    signupBaseRules,
    loginBaseRules
}

export default config