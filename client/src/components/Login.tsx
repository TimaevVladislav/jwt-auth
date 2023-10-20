import * as React from "react"
import  {FC, useState} from "react"
import {Context} from "../index"

const Login: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // @ts-ignore
    const {store} = React.useContext(Context)

    return (
        <div>
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            />

            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            />

            <button onClick={() => store.login({email, password})}>Login</button>
            <button onClick={() => store.registration({email, password})}>Register</button>
        </div>
    );
};

export default Login