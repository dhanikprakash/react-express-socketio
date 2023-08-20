import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {

        if (message !== "") {
            const messageData = {
                roomId: room,
                author: username,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(data);

        })
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header"><p>Live chat</p></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((event) => {
                    return (
                        <div className={username === event.author ? "you message": "other message"}>
                        <div className="message-content">
                            <p>{event.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{event.time}</p>
                            <p id="name">{event.author}</p>
                        </div>
                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">

                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} placeholder='message...'></input>
                <button onClick={() => sendMessage()} className="sendButton"> Send</button>

            </div>
        </div>

    )
}

export default Chat