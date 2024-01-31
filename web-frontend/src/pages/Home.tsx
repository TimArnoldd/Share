import { FC, useEffect, useState } from "react";


export const Home: FC = () => {

    const [messages, setMessages] = useState([]);

    function sendMessage() {
        const content = (document.getElementById("content") as HTMLInputElement).value;
        fetch("http://localhost:3000/message/create", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ content: content }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response) => {
            if (response.ok) {
                loadMessages();
            } else {
                window.location.href = "/setToken";
                return;
            }
        });
    }

    function loadMessages() {
        fetch("http://localhost:3000/room/messages", {
            method: "GET",
            credentials: "include",
        }).then(async (response: Response) => {
            if (!response.ok) {
                window.location.href = "/setToken";
                return;
            }
            let messages = await response.json();
            messages = messages.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
            setMessages(messages);
        });
    }

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <>
            <h1>Hoi</h1>
            <ul>
                {messages.map((message: any) => {
                    return <li>{message.content}</li>;
                })}
            </ul>
            <input type="text" name="content" id="content" />
            <button onClick={sendMessage}>Send</button>
        </>
    );
}