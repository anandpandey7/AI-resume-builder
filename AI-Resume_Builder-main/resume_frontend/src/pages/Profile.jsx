import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { getResumeById } from '../api/ResumeService';
import toast from 'react-hot-toast';

function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const savedResumes = useSelector((state) => state.resume.savedResumes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleResumeClick = async (id) => {
    try {
      setLoadingId(id);
      const resumeData = await getResumeById(id);
      navigate('/generate-resume', { state: { initialData: resumeData } });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch resume data');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-primary h-32 w-full"></div>
          <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end justify-between relative -mt-16">
            <div className="flex flex-col items-center md:flex-row md:items-end gap-6">
              <div className="avatar placeholder ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full shadow-2xl">
                <div className="bg-base-100 text-primary-content rounded-full w-32 h-32 flex items-center justify-center font-bold text-6xl">
                  <span className="text-primary">{user.firstName?.charAt(0).toUpperCase() || "U"}</span>
                </div>
              </div>
              <div className="text-center md:text-left mt-4 md:mt-0 pb-2">
                <h1 className="text-4xl font-extrabold text-base-content">{user.firstName} {user.lastName}</h1>
                <p className="text-lg text-base-content/70">{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-error btn-outline mt-6 md:mt-0 rounded-full px-8">
              Logout
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-base-content">My Saved Resumes</h2>
        
        {savedResumes && savedResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedResumes.map((resume) => (
              <div 
                key={resume.resumeId} 
                onClick={() => handleResumeClick(resume.resumeId)}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-base-200 hover:border-primary group"
              >
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
                    {resume.title || `Resume #${resume.resumeId}`}
                  </h2>
                  <p className="text-sm text-base-content/60 mt-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(resume.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm rounded-full">
                      {loadingId === resume.resumeId ? <span className="loading loading-spinner loading-xs"></span> : "Edit Resume"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-base-100 p-12 rounded-2xl shadow text-center border border-dashed border-base-300">
            <h3 className="text-2xl font-bold text-base-content mb-2">No resumes yet!</h3>
            <p className="text-base-content/70 mb-6">You haven't saved any resumes to your profile.</p>
            <button onClick={() => navigate('/generate-resume')} className="btn btn-primary rounded-full px-8">
              Create Your First Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
