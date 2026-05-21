import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResumeById, generateInterviewQuestions } from '../api/ResumeService';
import toast from 'react-hot-toast';

export default function InterviewPrep() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const savedResumes = useSelector((state) => state.resume.savedResumes);
  const navigate = useNavigate();

  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }

  const handleGenerateQuestions = async () => {
    if (!selectedResumeId) {
      toast.error('Please select a saved resume first.');
      return;
    }

    try {
      setIsLoading(true);
      setQuestions(null);
      const fullResumeData = await getResumeById(selectedResumeId);
      const response = await generateInterviewQuestions(fullResumeData);
      
      // The response structure matches our prompt
      if (response && response.data) {
        setQuestions(response.data);
        toast.success('Questions generated successfully!');
      } else {
        toast.error('Failed to parse questions format.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate interview questions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-base-content sm:text-5xl">Interview Preparation</h1>
          <p className="mt-3 text-xl text-base-content/70">
            Generate targeted behavioral and technical interview questions based on your resume.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-primary">Select a Resume</h2>
            
            {savedResumes && savedResumes.length > 0 ? (
              <div className="form-control w-full">
                <select 
                  className="select select-bordered select-primary w-full"
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                >
                  <option value="" disabled>Choose one of your saved resumes</option>
                  {savedResumes.map(resume => (
                    <option key={resume.resumeId} value={resume.resumeId}>
                      {resume.title || `Resume #${resume.resumeId}`}
                    </option>
                  ))}
                </select>
                <div className="mt-6 flex justify-end">
                  <button 
                    className="btn btn-primary"
                    onClick={handleGenerateQuestions}
                    disabled={!selectedResumeId || isLoading}
                  >
                    {isLoading ? <span className="loading loading-spinner"></span> : "Generate Questions"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="alert alert-info shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>You don't have any saved resumes. Generate and save a resume first!</span>
                </div>
                <div className="flex-none">
                  <button onClick={() => navigate('/generate-resume')} className="btn btn-sm btn-primary">Go to Generator</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {questions && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="card bg-base-100 shadow-xl border border-secondary">
              <div className="card-body">
                <h2 className="card-title text-2xl text-secondary mb-4 border-b pb-2">Technical & Role-Specific Questions</h2>
                <div className="space-y-6">
                  {questions.technicalQuestions?.map((item, index) => (
                    <div key={index} className="bg-base-200 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2 flex gap-2">
                        <span className="text-secondary">{index + 1}.</span> {item.question}
                      </h3>
                      <div className="bg-base-100 p-3 rounded border-l-4 border-secondary text-sm">
                        <strong>Tip:</strong> {item.tip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-accent">
              <div className="card-body">
                <h2 className="card-title text-2xl text-accent mb-4 border-b pb-2">Behavioral Questions</h2>
                <div className="space-y-6">
                  {questions.behavioralQuestions?.map((item, index) => (
                    <div key={index} className="bg-base-200 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2 flex gap-2">
                        <span className="text-accent">{index + 1}.</span> {item.question}
                      </h3>
                      <div className="bg-base-100 p-3 rounded border-l-4 border-accent text-sm">
                        <strong>Tip:</strong> {item.tip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
