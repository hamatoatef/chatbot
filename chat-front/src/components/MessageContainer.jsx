import MessageInput from "./MessageInput";
import Messages from "./Messages";

function MessageContainer() {
  return (
    <div className="flex flex-col h-screen p-9">
      <h1 className="text-slate-100 text-5xl pb-5">
        Your Personal <br></br> AI assistant
      </h1>
      <div className="card card-compact bg-gray-900 w-96 shadow-xl md:min-w-[750px] p-[15px]">
        <div className="flex sm:h-[450px]  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <div className="md:min-w-[720px] flex flex-col">
            <Messages />
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;
