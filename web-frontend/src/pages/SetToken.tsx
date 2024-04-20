import { FC } from "react";

export const SetToken: FC = () => {

    function setToken(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const token = (document.getElementById("token") as HTMLInputElement).value;
        document.cookie = `roomId=${token}`;
        window.location.href = "/";
    }

    return (
        <div className="centerContent">
            <h1>Set Token</h1>
            <form onSubmit={setToken}>
                <input type="text" name="token" id="token" style={{marginRight: "20px"}} />
                <input type="submit" value="Set Token" />
            </form>
        </div>
    );
}