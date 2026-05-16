import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Use a reliable CDN to load the worker file for pdfjs-dist.
// Unpkg works well and we interpolate the version directly.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function JdResume() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const extractTextFromPDF = async (file) => {
    try {
      setIsLoading(true);
      setErrorMsg('');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      setResumeText(fullText);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      setErrorMsg('Failed to extract text from PDF. Please ensure it is a valid PDF file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      extractTextFromPDF(file);
    } else if (file) {
      setErrorMsg('Please upload a valid PDF file.');
      setFileName('');
      setResumeText('');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-base-content sm:text-5xl">JD & Resume Matcher</h1>
          <p className="mt-3 text-xl text-base-content/70">
            Paste your Job Description and upload your Resume to extract and analyze the text.
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Description Section */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-primary">1. Job Description</h2>
              <div className="form-control h-full">
                <label className="label">
                  <span className="label-text font-semibold">Paste the Job Description here</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered flex-grow h-96 w-full text-base focus:ring-2 focus:ring-primary" 
                  placeholder="e.g. We are looking for a Software Engineer with experience in React and Node.js..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className="card bg-base-100 shadow-xl border border-base-300 flex flex-col">
            <div className="card-body flex flex-col h-full">
              <h2 className="card-title text-2xl mb-4 text-secondary">2. Upload Resume</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Select your resume (PDF only)</span>
                </label>
                <input 
                  type="file" 
                  accept="application/pdf"
                  className="file-input file-input-bordered file-input-secondary w-full" 
                  onChange={handleFileChange}
                />
                {fileName && (
                  <label className="label">
                    <span className="label-text-alt text-success font-medium">Selected: {fileName}</span>
                  </label>
                )}
              </div>

              <div className="mt-6 flex-grow flex flex-col">
                <label className="label">
                  <span className="label-text font-semibold">Extracted Resume Text</span>
                  {isLoading && <span className="loading loading-spinner loading-sm text-secondary"></span>}
                </label>
                <textarea 
                  className="textarea textarea-bordered flex-grow h-64 w-full text-sm bg-base-200/50" 
                  placeholder="Extracted text will appear here after uploading a PDF..."
                  value={resumeText}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button (Placeholder for future functionality) */}
        <div className="flex justify-center mt-8 pb-8">
          <button 
            className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform px-12"
            disabled={!jobDescription || !resumeText || isLoading}
          >
            Analyze Match
          </button>
        </div>

      </div>
    </div>
  );
}
