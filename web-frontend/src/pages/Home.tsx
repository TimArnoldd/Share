import { FC, useEffect, useState } from "react";
import { Room } from "../models/Room";
import { Message } from "../models/Message";
import { MessageCard } from "../components/MessageCard";
import { backend } from '../utils/axios';


export const Home: FC = () => {

    const [messages, setMessages] = useState(Array.from<Message>([]));
    const [room, setRoom] = useState<Room>();

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const messageInput = document.getElementById("message") as HTMLInputElement;
        const content = messageInput.value;
        if (!content) return;
        backend("/api/message/create", {
            method: "POST",
            withCredentials: true,
            data: JSON.stringify({ content: content }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async () => {
            messageInput.value = "";
            loadMessages();
        }).catch(() => {
            window.location.href = "/setToken";
        });
    }

    function loadMessages() {
        backend("/api/room/messages", {
            method: "GET",
            withCredentials: true,
        }).then(async (response) => {
            let messages: Message[] = (await response.data).map((message: any): Message => {
                return Message.fromObject(message)
            });
            messages = messages.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
            setMessages(messages);
        }).catch(() => {
            window.location.href = "/setToken";
        });
    }

    useEffect(() => {
        loadMessages();

        backend("/api/room", {
            method: "GET",
            withCredentials: true,
        }).then(async (response) => {
            console.log("hoi");
            const room = Room.fromObject(response.data);
            setRoom(room);
        }).catch(() => {
            window.location.href = "/setToken";
        });
    }, []);

    return (
        <div className="centerContent messagePage">
            <h1>{room?.name}</h1>
            <p>{room?.id}</p>
            <div className="messageContainer">
                <div className="messageInnerContainer">
                    {messages.map((message) => {
                        return <MessageCard key={message.id} message={message.content} />;
                    })}
                </div>
            </div>
            <div className="messageInput">
                <form onSubmit={sendMessage}>
                    <input type="text" name="message" id="message" style={{ marginRight: "20px" }} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    );
}