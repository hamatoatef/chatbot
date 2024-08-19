import { useEffect, useRef } from "react";
import { useChat } from "../hooks/usegetChat";
import Message from "./Message";

const Messages = () => {
  const { chat } = useChat();
  const endOfMessagesRef = useRef(null);

  // Ensure chat and chat_history are properly defined
  const chatHistoryToShow =
    chat && Array.isArray(chat.chat_history) ? chat.chat_history.slice(2) : [];

  useEffect(() => {
    // Scroll to the bottom of the chat
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistoryToShow]);

  // Check if chat and chat_history are properly defined
  if (!chat || !Array.isArray(chat.chat_history)) {
    console.error("chat or chat_history is not defined or not an array", chat);
    return null;
  }

  return (
    <div className="px-4 flex-1 overflow-auto">
      {chatHistoryToShow.map(([speaker, text], index) => (
        <Message key={index} speaker={speaker} text={text} />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
export default Messages;
