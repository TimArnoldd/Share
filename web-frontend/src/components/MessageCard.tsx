import { FC } from 'react';
import './MessageCard.css';
import { PiClipboard } from "react-icons/pi";

export const MessageCard: FC<{message: string}> = ({message}) => {

    function copyMessage() {
        navigator.clipboard.writeText(message);
    }

    return (
        <div className="messageCard tooltip" onClick={copyMessage} >
            <span>{message}</span>
            <PiClipboard />
            <span className="tooltipText">Copy</span>
        </div>
    );
}