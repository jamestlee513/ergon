import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

function SignUpForm({ authenticated, setAuthenticated }) {


    const [errors, setErrors] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (authenticated) {
        return <Redirect to="/" />
    }

    const signUpUser = async e => {
        e.preventDefault();
        const user = await signUp(
            firstname,
            lastname,
            username,
            email,
            password
        );
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
                    type="text"
                    placeholder="first name"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="last name"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
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
                <button type="submit" onClick={signUpUser}>Sign Up</button>
            </form>
        </>
    )
}

export default SignUpForm;