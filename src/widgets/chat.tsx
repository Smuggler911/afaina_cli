import send_icon from "../assets/send-alt-1-svgrepo-com.svg";
import close_icon from '../assets/cross-svgrepo-com.svg';
import "./chat.css"
import {  useEffect, useState } from "react";
import { useChat } from "../context/context";



interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

interface Answer{
    content:string,
    role:string | undefined,
    tool_calls:[]
}

export const Chat: React.FC =()=>{


    const [isSend,SetSend] = useState(false);

    const chat_filed = document.getElementsByClassName("chat_filed")[0];

    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('chatHistory');
        return saved ? JSON.parse(saved) : [];
    }); 
    
    const [value,setText] = useState("");

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages))
    }, [messages]);

    const handleSend = async () => {
        if (value.trim() === '') return;



        const newMessage: Message = {
            id: Date.now(),
            text: value,
            sender: 'user',
        };
        const val = {
            message:value
        }

       if(chat_filed.scrollHeight > 620){
            chat_filed.scrollTo(0,chat_filed.scrollHeight-1);
            
        }

        setMessages(prev => [...Object.values(prev), newMessage]);

        setText('');
        SetSend(true);

        const response = await fetch("/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server returned error:", errorText);
            return;
        }

        const json = await response.json();
        const msg: Answer = json.message;



        const botResponse: Message = {
            id: Date.now() + 1,
            text:msg.content,
            sender: 'bot',
        };

        setTimeout(() => {
            setMessages(prev => [...Object.values(prev), botResponse]);
        }, 1000);
        
     
    };



    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            handleSend();
            event.preventDefault();
        }
    }

    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        event.preventDefault();
    }


 
    
    const chatCtx = useChat();
    const closeChat = chatCtx?.closeChat;


    function displMessage(){
        if(isSend){
            return(
                messages.map(msg => (
                    <div className="msg_buble" id ={msg.sender}>
                        <p className="buble_text" >{msg.text}</p>
                    </div>
                ))
            )
        }
    }

    return (
        <>
        <div className="c_wrapper">
            <div className="dialog_chat_container">
                <div className='cross_close'><button className='close_button' onClick={closeChat}><img src={close_icon}/></button></div>
                <div className="chat_filed">
                {
                    displMessage()
                }
                </div>
                <div className="chat_input_form">
                    <textarea id="user_text" value={value} onKeyDown={(e) => e.key === 'Enter' && handleSend()} onChange={(e) => setText(e.target.value)}></textarea>
                    <button className="send_button" onClick={handleSend}><img src={send_icon}/></button>
                </div>
            </div>
         </div>
        </>
    )
}