import { toast } from "react-toastify";

function FileUpload({ onUpload, isLoading }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else if (file) {
      toast.error("Please upload a PDF file");
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        {isLoading ? "Uploading..." : "Upload PDF"}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
}

export default FileUpload;
