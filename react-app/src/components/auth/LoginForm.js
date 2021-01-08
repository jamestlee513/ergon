import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

function LoginForm({authenticated, setAuthenticated}) {

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("Authenticated?", authenticated)
    if (authenticated) {
        return <Redirect to="/" />
    }
    const loginUser = async e => {
        e.preventDefault();
        const user = await login(email, password);
        if(!user.errors) {
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    }

    const loginDemo = async e => {
        e.preventDefault();
        const user = await login("demo@demo.com", "password");
        if(!user.errors) {
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    }

    return (
        <>
            {errors.length > 0 && (
                <div>
                    <div>We encoutered the following errors:</div>
                    {errors.map((error, idx) =>
                        <div key={idx}>
                            {error}
                        </div>
                    )}
                </div>
            )}
            <form>
                <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" onClick={loginUser}>Log In</button>
                <button type="submit" onClick={loginDemo}>Log in as Demo User</button>
            </form>
        </>
    )
}

export default LoginForm;