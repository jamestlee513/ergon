import Cookies from 'js-cookie';

export const authenticate = async () => {
    console.log(typeof Cookies.get("csrf_access_token"));
    const res = await fetch("/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: Cookies.get("csrf_access_token")
        })
    });
    return await res.json();
};

export const login = async (email, password) => {
    const res = await fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
};

export const logout = async () => {
    const res = await fetch("/users/logout", {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await res.json();
};

export const signUp = async (
    firstname,
    lastname,
    username,
    email,
    password
) => {
    const res = await fetch("/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password
        })
    });
    return await res.json();
};