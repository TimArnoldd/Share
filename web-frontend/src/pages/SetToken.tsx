import { FC } from "react";

export const SetToken: FC = () => {

    function setToken() {
        const token = (document.getElementById("token") as HTMLInputElement).value;
        document.cookie = `roomId=${token}`;
        window.location.href = "/";
    }

    return (
        <>
            <h1>Set Token</h1>
            <input type="text" name="token" id="token" />
            <button onClick={setToken}>Set token</button>
        </>
    );
}