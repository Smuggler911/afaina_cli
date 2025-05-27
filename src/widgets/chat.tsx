import send_icon from "../assets/send-alt-1-svgrepo-com.svg";
import "./chat.css"
import {  useState } from "react";


export const Chat =()=>{
    const [isSend,SetSend] = useState(false);
    type Message = {
        txt:string | null;
    }
    const [message, setMessage] = useState<Message>({
        txt:""
    });

    const [text,setText] = useState("");

    function send(){
        setMessage({
            txt:text
        });
        SetSend(true);
    }

  

    function displMessage(){
        if(isSend){
            return(
                <div className="msg_buble">
                    <p className="buble_text">{message.txt}</p>
                </div>
            )
    }
    }

    return (
        <>
        <div className="c_wrapper">
            <div className="dialog_chat_container">
                <div className="chat_filed">
                {
                    displMessage()
                }
                </div>
                <div className="chat_input_form">
                    <textarea id="user_text" onChange={(e)=>setText(e.target.value)}></textarea>
                    <button className="send_button" onClick={send}><img src={send_icon}/></button>
                </div>
            </div>
         </div>
        </>
    )
}