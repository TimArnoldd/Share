import { FC, useEffect, useState } from "react";
import { Room } from "../models/Room";
import { Message } from "../models/Message";


export const Home: FC = () => {

    const [messages, setMessages] = useState(Array.from<Message>([]));
    const [room, setRoom] = useState(new Room());

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

    // TODO: Gets executed twice
    function loadMessages() {
        fetch("http://localhost:3000/room/messages", {
            method: "GET",
            credentials: "include",
        }).then(async (response: Response) => {
            if (!response.ok) {
                window.location.href = "/setToken";
                return;
            }
            let messages: Message[] = (await response.json()).map((message: any): Message => {
                return Message.fromJson(message)
            });
            messages = messages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
            setMessages(messages);
        });
    }

    useEffect(() => {
        loadMessages();

        fetch("http://localhost:3000/room", {
            method: "GET",
            credentials: "include",
        }).then(async (response: Response) => {
            if (!response.ok) {
                window.location.href = "/setToken";
                return;
            }
            const room = Room.fromJson(await response.json());
            setRoom(room);
        });
    }, []);

    return (
        <>
            <h1>Hoi</h1>
            <ul>
                {messages.map((message) => {
                    return <li key={message.id}>{message.content}</li>;
                })}
            </ul>
            <input type="text" name="content" id="content" />
            <button onClick={sendMessage}>Send</button>
            <p>{room.id}</p>
            <p>{room.name}</p>
        </>
    );
}