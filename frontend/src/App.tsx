import { useEffect, useState, useRef } from "react";
import Button from "./components/Button";
import { Input } from "./components";

interface Message {
    type: String;
    message: String;
}

function App() {
    const [socket, setSocket] = useState<WebSocket | null>();
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const inputRef: any = useRef();

    const sendMessage = () => {
        if (socket) {
            const message = inputRef.current.value;
            socket.send(message);
            setChatMessages([
                ...chatMessages,
                { type: "send", message: message },
            ]);
            inputRef.current.value = "";
        } else {
            return;
        }
    };
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);

    }, []);

    if (socket) {
        // when we will  have a socket, we will listen for incoming messages and add them to the chatMessages array
        socket.onmessage = (event: any) => {
            setChatMessages([...chatMessages, {  type: "receive", message: event.data }]);
        };
    }

    console.log(chatMessages);

    return (
        <div className="max-w-full min-h-screen flex justify-center items-center bg-black font-primary">
            <div className="w-[500px] flex flex-col h-[500px] gap-1 p-1 bg-blue-400 rounded-md">
                <div className="flex-grow flex items-end rounded-md bg-amber-400 py-1 overflow-y-scroll overflow-scroll">
                    {chatMessages.length > 0 ? (
                        <div className="w-full flex flex-col gap-2">
                            {chatMessages.map((message, index) =>
                                message.type === "send" ? (
                                    <div className="bg-black w-fit text-end place-self-end text-white py-2 px-2 rounded-md mx-1" key={index}>
                                        {message.message}
                                    </div>
                                ) : (
                                    <div className="bg-amber-800 w-fit text-start place-self-start text-black py-2 px-2 rounded-md mx-1" key={index}>
                                        {message.message}
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="grid place-content-center w-full h-full">
                            No messages yet
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <Input
                        backgroundColor="slate"
                        borderRadius={"rounded-md"}
                        fontColor="black"
                        fontSize="lg"
                        inputType="text"
                        placeholder={"Enter message"}
                        ref={inputRef}
                        padding={"px-4 py-2"}
                        border={"border-2 border-black"}
                        outline={"outline-none"}
                        classes={"flex-grow"}
                    />

                    <Button
                        text={"Send"}
                        padding={"px-4 py-2"}
                        borderRadius={"rounded-md"}
                        fontColor="white"
                        fontSize="lg"
                        backgroundColor="black"
                        onHoverStyle={"hover:opacity-80"}
                        onActiveStyle={"active:scale-95"}
                        onClick={sendMessage}
                        classes="w-full font-semibold"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
