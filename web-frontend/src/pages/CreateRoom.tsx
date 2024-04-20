import { FC } from "react";
import { Room } from "../models/Room";

export const CreateRoom: FC = () => {

    function createRoom(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

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
        <div className="centerContent">
            <h1>Create Room</h1>
            <form onSubmit={createRoom}>
                <input type="text" name="name" id="name" style={{marginRight: "20px"}} />
                <input type="submit" value="Create new Room" />
            </form>
            <p id="output"></p>
        </div>
    )
};
