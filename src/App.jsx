import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FileUpload";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [documentId, setDocumentId] = useState(null);
  const [currentFilename, setCurrentFilename] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleUpload = async (file) => {
    if (!file) return;
    setIsLoadingUpload(true);
    setChatMessages([]);
    setDocumentId(null);
    setCurrentFilename("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload Response:", response.data);
      setDocumentId(response.data.document_id);
      setCurrentFilename(response.data.filename);
      setChatMessages([
        {
          type: "system",
          text: `Uploaded ${response.data.filename}. Ready to ask questions.`,
        },
      ]);
      // Show success toast notification
      toast.success(`PDF "${response.data.filename}" uploaded successfully!`);
    } catch (error) {
      console.error("Upload Error:", error);
      let errorMessage = "File upload failed. Please try again.";
      if (error.response?.data?.detail) {
        errorMessage = `Upload failed: ${error.response.data.detail}`;
      } else if (error.request) {
        errorMessage = "Upload failed: Could not reach server.";
      }
      setChatMessages([{ type: "error", text: errorMessage }]);
      toast.error(errorMessage);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const handleAskQuestion = async (question) => {
    if (!documentId || !question) return;
    const newUserMessage = { type: "user", text: question };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoadingAnswer(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/ask`, {
        document_id: documentId,
        question: question,
      });
      console.log("Ask Response:", response.data);
      const botMessage = { type: "bot", text: response.data.answer };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Ask Error:", error);
      let errorMessage = "Failed to get answer. Please try again.";
      if (error.response?.data?.detail) {
        errorMessage = `Error: ${error.response.data.detail}`;
      } else if (error.request) {
        errorMessage = "Error: Could not reach server.";
      }
      const errorMessageObj = { type: "error", text: errorMessage };
      setChatMessages((prevMessages) => [...prevMessages, errorMessageObj]);
      toast.error(errorMessage);
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <header className="w-full bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto w-full px-4 py-3 flex justify-between items-center">
          <img src="headerLogo.svg" alt="Planet" height={60} width={140} />

          <div className="flex items-center space-x-4">
            {currentFilename && (
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm">{currentFilename}</span>
              </div>
            )}

            <FileUpload onUpload={handleUpload} isLoading={isLoadingUpload} />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto w-full">
          <ChatInterface
            chatMessages={chatMessages}
            onAskQuestion={handleAskQuestion}
            isLoadingAnswer={isLoadingAnswer}
            isEnabled={!!documentId}
          />
        </div>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
    </div>
  );
}

export default App;
