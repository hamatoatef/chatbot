import { marked } from "marked";

function Message({ speaker, text }) {
  const from = speaker == "user" ? "chat-end" : "chat-start";
  const bubbleBgColor = speaker == "user" ? "bg-blue-500" : "";
  const profilePic =
    speaker == "user"
      ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      : "/robot.jpg";

  // Convert markdown text to HTML
  const htmlText = marked(text);

  return (
    <div className={`chat ${from}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} text-base`}
        dangerouslySetInnerHTML={{ __html: htmlText }}
      />
    </div>
  );
}

export default Message;
