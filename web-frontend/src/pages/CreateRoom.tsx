import { FC } from "react";
import { Room } from "../models/Room";

export const CreateRoom: FC = () => {

    function createRoom() {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        fetch("/api/room/create", {
            method: "POST",
            body: JSON.stringify({ name: name }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response: Response) => {
            if (response.ok) {
                const room = Room.fromJson(await response.json());
                document.getElementById("output")!.innerText = `${room.name}: ${room.id}`;
            }
        });
    }

    return (
        <>
            <h1>Create Room</h1>
            <input type="text" name="name" id="name" />
            <button onClick={createRoom}>Create new room</button>
            <p id="output"></p>
        </>
    )
};
