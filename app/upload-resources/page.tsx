"use client";
import { useState, useRef } from 'react';
import { Upload, FileText, File, X, AlertCircle, CheckCircle } from 'lucide-react';

// Reuse your existing color palette
const colors = {
  mainBackground: '#2C2A3B',
  secondaryBackground: '#3A374F',
  primaryText: '#F8F5FB',
  secondaryText: '#C7C3D4',
  accentPrimary: '#D9456F',
  accentAlternative: '#B5375A',
  success: '#6BBF59',
  error: '#D9534F',
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check if file is PDF or Word document
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setUploadStatus('idle');
      } else {
        alert('Please select a PDF or Word document');
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    try {
      // In a real application, you would upload the file to your server here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo purposes
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setUploadStatus('success');
        // Reset form after successful upload
        setTitle('');
        setDescription('');
        handleRemoveFile();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <FileText size={48} className={`text-[${colors.secondaryText}]`} />;
    
    if (file.type === 'application/pdf') {
      return <FileText size={48} className={`text-[${colors.error}]`} />;
    } else {
      return <File size={48} className={`text-[${colors.accentPrimary}]`} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[${colors.mainBackground}] text-[${colors.primaryText}] py-12`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-[${colors.secondaryBackground}] rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-2">Share Your Knowledge</h1>
          <p className={`text-[${colors.secondaryText}] mb-8`}>
            Upload study materials, notes, or resources to help fellow students
          </p>
          
          {/* Upload Status Messages */}
          {uploadStatus === 'success' && (
            <div className={`mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700 flex items-center`}>
              <CheckCircle className="text-green-500 mr-3" />
              <span>Your document has been uploaded successfully!</span>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className={`mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 flex items-center`}>
              <AlertCircle className="text-red-500 mr-3" />
              <span>There was an error uploading your document. Please try again.</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* File Upload Area */}
            <div 
              className={`border-2 border-dashed border-[${colors.secondaryText}] rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-[${colors.accentPrimary}] transition-colors`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              
              {file ? (
                <div className="flex flex-col items-center">
                  {getFileIcon()}
                  <p className="mt-4 font-medium">{file.name}</p>
                  <p className={`text-sm text-[${colors.secondaryText}]`}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className={`mt-4 text-[${colors.accentPrimary}] hover:text-[${colors.accentAlternative}] flex items-center`}
                  >
                    <X size={16} className="mr-1" />
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className={`mx-auto text-[${colors.secondaryText}] mb-4`} />
                  <p className="font-medium">Click to upload a document</p>
                  <p className={`text-sm text-[${colors.secondaryText}]`}>PDF or Word documents only</p>
                </>
              )}
            </div>
            
            {/* Title Input */}
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 font-medium">
                Document Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-3 rounded-lg bg-[${colors.mainBackground}] border border-[${colors.secondaryBackground}] focus:border-[${colors.accentPrimary}] focus:outline-none`}
                placeholder="e.g., Calculus 101 Study Notes"
                required
              />
            </div>
            
            {/* Description Input */}
            <div className="mb-8">
              <label htmlFor="description" className="block mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full p-3 rounded-lg bg-[${colors.mainBackground}] border border-[${colors.secondaryBackground}] focus:border-[${colors.accentPrimary}] focus:outline-none`}
                placeholder="Describe what this document contains and how it might help others..."
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || !title || isUploading}
              className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-300 ease-in-out
                ${(!file || !title || isUploading) 
                  ? `bg-gray-600 cursor-not-allowed` 
                  : `bg-[${colors.accentPrimary}] hover:bg-[${colors.accentAlternative}]`}
              `}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload Document'
              )}
            </button>
          </form>
        </div>
        
        {/* Guidelines Section */}
        <div className={`mt-12 bg-[${colors.secondaryBackground}] rounded-xl shadow-lg p-6 md:p-8`}>
          <h2 className="text-xl font-bold mb-4">Upload Guidelines</h2>
          <ul className={`space-y-2 text-[${colors.secondaryText}]`}>
            <li className="flex items-start">
              <div className={`h-2 w-2 rounded-full bg-[${colors.accentPrimary}] mt-2 mr-3`}></div>
              <span>Only upload materials you created or have permission to share</span>
            </li>
            <li className="flex items-start">
              <div className={`h-2 w-2 rounded-full bg-[${colors.accentPrimary}] mt-2 mr-3`}></div>
              <span>Ensure your documents are clear and well-organized</span>
            </li>
            <li className="flex items-start">
              <div className={`h-2 w-2 rounded-full bg-[${colors.accentPrimary}] mt-2 mr-3`}></div>
              <span>Provide accurate titles and descriptions to help others find your content</span>
            </li>
            <li className="flex items-start">
              <div className={`h-2 w-2 rounded-full bg-[${colors.accentPrimary}] mt-2 mr-3`}></div>
              <span>Accepted formats: PDF, DOC, and DOCX</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}