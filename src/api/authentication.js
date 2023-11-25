import request from '@/utils/request';

async function loginApi(username, password) {
    try {
        const data = await request(
            "POST",
            "/blogger/login",
            { username, password }
        );
        return data;
    } catch(err) {
        return err;
    }
}

async function signupApi(username, password) {
    try {
        const data = await request(
            "POST",
            "/blogger/signup",
            { username, password}
        )
        return data;
    } catch(err) {
        return err
    }
}

async function validateUniqueUsernameApi(username) {
    try {
        const data = await request(
            "POST",
            "/blogger/checkUniqueUsername",
            { username }
        );
        return data;
    } catch(err) {
        return err;
    }
}

export {
    loginApi,
    signupApi,
    validateUniqueUsernameApi
}