import request from '@/utils/request';

async function loginApi(username, password) {
    try {
        const data = await request(
            "POST",
            "/blogger/user/login",
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
            "/blogger/user/signup",
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
            "/blogger/user/validateUniqueUsername",
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