import { FC, useEffect, useState } from "react";
import { Room } from "../models/Room";
import { Message } from "../models/Message";
import { MessageCard } from "../components/MessageCard";


export const Home: FC = () => {

    const [messages, setMessages] = useState(Array.from<Message>([]));
    const [room, setRoom] = useState<Room>();

    function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const messageInput = document.getElementById("message") as HTMLInputElement;
        const content = messageInput.value;
        if (!content) return;
        fetch("/api/message/create", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ content: content }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response) => {
            if (response.ok) {
                messageInput.value = "";
                loadMessages();
            } else {
                window.location.href = "/setToken";
                return;
            }
        });
    }

    function loadMessages() {
        fetch("/api/room/messages", {
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

        fetch("/api/room", {
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
                    <input type="text" name="message" id="message" style={{marginRight: "20px"}} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        </div>
    );
}