
import { Chat } from "../../widgets/chat"
import chatIcon from "../../assets/hinduism-god-svgrepo-com.svg"
import "./mainPage.css"
import { useChat } from "../../context/context"

export const MainPage = () =>{
    const chatIsOpen= useChat();
    const openChat = chatIsOpen?.openChat;
    
    return (
        <>
        {
          chatIsOpen?.chatIsOpen?
            <Chat/> 
            : 
            <div onClick={openChat} className="chatbot_icon">
                <img src={chatIcon}/>
            </div>
        }
        </>
    )
}