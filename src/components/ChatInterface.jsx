import { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

function ChatInterface({
  chatMessages = [],
  onAskQuestion,
  isLoadingAnswer,
  isEnabled,
}) {
  const [question, setQuestion] = useState("");
  const chatEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSendClick = () => {
    if (question.trim() && isEnabled && !isLoadingAnswer) {
      onAskQuestion(question.trim());
      setQuestion("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !isLoadingAnswer) {
      event.preventDefault();
      handleSendClick();
    }
  };

  // Get user initials for avatar
  const getUserInitial = () => {
    return "User"; // This could be dynamic based on user info
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {chatMessages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-center">
              {isEnabled
                ? "Upload a PDF and ask questions about it"
                : "Upload a PDF to get started"}
            </p>
          </div>
        )}

        {chatMessages.map((msg, index) => {
          if (msg.type === "system") {
            return (
              <div
                key={index}
                className="text-center text-sm text-gray-500 my-2"
              >
                {msg.text}
              </div>
            );
          }

          if (msg.type === "error") {
            return (
              <div
                key={index}
                className="text-center text-sm text-red-500 my-2"
              >
                {msg.text}
              </div>
            );
          }

          if (msg.type === "user") {
            return (
              <div key={index} className="flex items-start justify-end">
                <div className="max-w-[80%] bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-800">{msg.text}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center ml-2 text-white font-medium">
                  {getUserInitial()}
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="flex items-start">
              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mr-2">
                <img src="aiplanet_logo.jpeg" />
              </div>
              <div className="max-w-[80%] bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-gray-800">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {isLoadingAnswer && (
          <div className="flex items-start">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <img src="aiplanet_logo.jpeg" height={50} width={50} />
            </div>
            <div className="max-w-[80%] bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white shadow-inner">
        <div className="flex items-center relative shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder={
              isEnabled
                ? "Ask a question about your PDF..."
                : "Upload a PDF first to ask questions"
            }
            value={question}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={!isEnabled || isLoadingAnswer}
            className="flex-1 py-3 px-4 focus:outline-none"
            id="question-input"
            data-tooltip-id="input-tooltip"
            data-tooltip-content={!isEnabled ? "Please upload a PDF first" : ""}
          />
          <button
            onClick={handleSendClick}
            disabled={!isEnabled || isLoadingAnswer || !question.trim()}
            className="absolute right-0 h-full px-4 bg-white disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-gray-600 transform rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        {!isEnabled && (
          <Tooltip id="input-tooltip" place="top" effect="solid" />
        )}
      </div>
    </div>
  );
}

export default ChatInterface;
