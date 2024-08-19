import { useState } from "react";

function WelcamePage({ setStatus }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:8000/upload_document", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { message } = await response.json();
        console.log(message);
        setStatus("start");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div>
      <h1 className="text-slate-100 text-5xl">
        Your Personal <br></br> AI assistant
      </h1>
      <p className="text-slate-200 text-xl p-5">
        Unlock the power of information with your personal AI assistant<br></br>{" "}
        Ask questions, get answers, and analyze your documents effortlessly.
      </p>

      <div className="relative">
        <input
          onChange={handleFileChange}
          type="file"
          id="fileInput"
          className="absolute inset-0 opacity-0 cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        />
        <label
          htmlFor="fileInput"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Upload Your Document
        </label>
      </div>
    </div>
  );
}

export default WelcamePage;
// Your AI assistant is ready to assist you
