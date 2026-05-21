import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateResume, editResume, getResumeById } from '../api/ResumeService';
import toast from 'react-hot-toast';

// Use a reliable CDN to load the worker file for pdfjs-dist.
// Unpkg works well and we interpolate the version directly.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function JdResume() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [activeTab, setActiveTab] = useState('upload'); 
  const [selectedResumeId, setSelectedResumeId] = useState('');
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const savedResumes = useSelector((state) => state.resume.savedResumes);
  const navigate = useNavigate();

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

  const handleTailorResume = async () => {
    if (!jobDescription) {
      toast.error('Please provide a job description.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      let tailoredData;

      if (activeTab === 'upload') {
        if (!resumeText) {
          toast.error('Please upload and extract a PDF resume first.');
          setIsLoading(false);
          return;
        }
        const prompt = `My resume text: ${resumeText}\n\nJob Description: ${jobDescription}\n\nPlease create a structured resume tailored to this job description.`;
        const response = await generateResume(prompt);
        tailoredData = response.data;
      } else {
        if (!selectedResumeId) {
          toast.error('Please select a saved resume.');
          setIsLoading(false);
          return;
        }
        const fullResumeData = await getResumeById(selectedResumeId);
        const response = await editResume(fullResumeData, jobDescription);
        tailoredData = response.data;
      }

      toast.success('Resume tailored successfully!');
      navigate('/generate-resume', { state: { initialData: tailoredData } });
    } catch (error) {
      console.error('Tailoring error:', error);
      setErrorMsg('Failed to tailor resume. Please try again.');
    } finally {
      setIsLoading(false);
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
              <h2 className="card-title text-2xl mb-4 text-secondary">2. Select Resume</h2>
              
              <div className="tabs tabs-boxed mb-4 bg-base-200">
                <a className={`tab ${activeTab === 'upload' ? 'tab-active' : ''}`} onClick={() => setActiveTab('upload')}>Upload PDF</a>
                <a className={`tab ${activeTab === 'saved' ? 'tab-active' : ''}`} onClick={() => setActiveTab('saved')}>Saved Resumes</a>
              </div>

              {activeTab === 'upload' ? (
                <>
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
                      {isLoading && activeTab === 'upload' && <span className="loading loading-spinner loading-sm text-secondary"></span>}
                    </label>
                    <textarea 
                      className="textarea textarea-bordered flex-grow h-64 w-full text-sm bg-base-200/50" 
                      placeholder="Extracted text will appear here after uploading a PDF..."
                      value={resumeText}
                      readOnly
                    ></textarea>
                  </div>
                </>
              ) : (
                <div className="form-control w-full flex-grow">
                  {!isAuthenticated ? (
                    <div className="alert alert-warning shadow-lg mt-4">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Please log in to use saved resumes.</span>
                      </div>
                    </div>
                  ) : savedResumes && savedResumes.length > 0 ? (
                    <>
                      <label className="label">
                        <span className="label-text font-semibold">Choose a resume to tailor</span>
                      </label>
                      <select 
                        className="select select-bordered select-secondary w-full"
                        value={selectedResumeId}
                        onChange={(e) => setSelectedResumeId(e.target.value)}
                      >
                        <option value="" disabled>Select a saved resume</option>
                        {savedResumes.map(resume => (
                          <option key={resume.resumeId} value={resume.resumeId}>
                            {resume.title || `Resume #${resume.resumeId}`}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <div className="alert alert-info shadow-lg mt-4">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>You don't have any saved resumes yet.</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Button (Placeholder for future functionality) */}
        <div className="flex justify-center mt-8 pb-8">
          <button 
            className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform px-12"
            disabled={!jobDescription || (activeTab === 'upload' && !resumeText) || (activeTab === 'saved' && !selectedResumeId) || isLoading}
            onClick={handleTailorResume}
          >
            {isLoading ? <span className="loading loading-spinner"></span> : "Tailor Resume"}
          </button>
        </div>

      </div>
    </div>
  );
}
