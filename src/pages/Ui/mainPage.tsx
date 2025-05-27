import { useState } from "react"
import { Chat } from "../../widgets/chat"
import chatIcon from "../../assets/hinduism-god-svgrepo-com.svg"
import "./mainPage.css"
export const MainPage = () =>{
    const [isOpend,SetIsOpened] = useState(false);

    return (
        <>
        {
            isOpend? 
            <Chat/> 
            : 
            <div onClick={()=>SetIsOpened(true)} className="chatbot_icon">
                <img src={chatIcon}/>
            </div>
        }
        </>
    )
}