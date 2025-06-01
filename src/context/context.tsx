import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ChatInterface{
    openChat:() => void,
    closeChat:()=>void,
    chatIsOpen:boolean
}

const ChatContext = createContext<ChatInterface | undefined>(undefined);

export function ContextProvider({children}:{children:ReactNode}){
    const [chatIsOpen,SetChatIsOpen]  = useState<boolean>(false);
    
    const closeChat = ()=>{
        SetChatIsOpen(false)
    }
    const openChat = () =>{
        SetChatIsOpen(true)
    }

    const value = useMemo(
        ()=>({
            openChat,
            closeChat,
            chatIsOpen
        }
        ),[chatIsOpen]
    );

    return <ChatContext.Provider value ={value}>{children}</ChatContext.Provider>
}

export function useChat(){
    const context = useContext(ChatContext);
    return context
}