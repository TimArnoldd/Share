import { FC } from "react";
import { Room } from "../models/Room";
import { backend } from "../utils/axios";

export const CreateRoom: FC = () => {

    function createRoom(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        backend("/api/room/create", {
            method: "POST",
            data: JSON.stringify({ name: name }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            console.log(response);
            const room = Room.fromObject(await response.data);
            document.getElementById("output")!.innerText = `${room.name}: ${room.id}`;
        }).catch(() => {
            // TODO: Fehler anzeigen
        });
    }

    return (
        <div className="centerContent">
            <h1>Create Room</h1>
            <form onSubmit={createRoom}>
                <input type="text" name="name" id="name" style={{ marginRight: "20px" }} />
                <input type="submit" value="Create new Room" />
            </form>
            <p id="output"></p>
        </div>
    )
};
