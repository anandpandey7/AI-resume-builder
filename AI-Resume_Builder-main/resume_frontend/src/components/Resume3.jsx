import React, { useRef } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaGraduationCap, 
  FaProjectDiagram, 
  FaAward,
  FaLanguage,
  FaHeart
} from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const Resume3 = ({ data }) => {
  const resumeRef = useRef(null);

  // Helper to check if an array exists and has items
  const hasData = (arr) => Array.isArray(arr) && arr.length > 0;

  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;

    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        const fileName = (data?.personalInformation?.fullName || "Resume").replace(/\s+/g, "_") + ".pdf";
        pdf.save(fileName);
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };

  // Prevent rendering if data is missing
  if (!data) return <div className="p-4 text-center text-gray-500">No data available</div>;

  return (
    <>
      {/* 
        The 'resumeRef' is applied to the main container. 
        The Print button is OUTSIDE this container so it won't appear in the PDF.
      */}
      <div
        ref={resumeRef}
        className="max-w-5xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-white text-gray-800 border border-gray-200"
      >
        {/* --- HEADER SECTION --- */}
        <header className="bg-slate-900 text-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {data.personalInformation?.fullName || "Your Name"}
              </h1>
              <p className="text-xl text-slate-300 font-medium">
                {data.personalInformation?.jobTitle || "Professional Title"}
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="flex flex-col gap-2 text-sm md:text-base text-slate-300">
              {data.personalInformation?.email && (
                <a href={`mailto:${data.personalInformation.email}`} className="flex items-center gap-2 hover:text-white transition">
                  <FaEnvelope /> {data.personalInformation.email}
                </a>
              )}
              {data.personalInformation?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <FaPhone /> {data.personalInformation.phoneNumber}
                </div>
              )}
              {data.personalInformation?.location && (
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {data.personalInformation.location}
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-slate-700">
            {data.personalInformation?.gitHub && (
              <a href={data.personalInformation.gitHub} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                <FaGithub size={20} />
              </a>
            )}
            {data.personalInformation?.linkedIn && (
              <a href={data.personalInformation.linkedIn} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition">
                <FaLinkedin size={20} />
              </a>
            )}
          </div>
        </header>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* --- LEFT SIDEBAR --- */}
          <aside className="bg-slate-50 p-6 md:p-8 border-r border-gray-100">
            
            {/* Skills Section */}
            {hasData(data.skills) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-slate-600 shadow-sm">
                      {skill.title}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {hasData(data.languages) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaLanguage /> Languages
                </h3>
                <ul className="space-y-2">
                  {data.languages.map((lang, idx) => (
                    <li key={idx} className="text-slate-600 text-sm flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-slate-400 text-xs">({lang.proficiency})</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications Section */}
            {hasData(data.certifications) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaAward /> Certifications
                </h3>
                <ul className="space-y-3">
                  {data.certifications.map((cert, idx) => (
                    <li key={idx} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <p className="font-semibold text-slate-800 text-sm">{cert.title}</p>
                      <p className="text-xs text-slate-500">{cert.issuingOrganization}</p>
                      <p className="text-xs text-slate-400 mt-1">{cert.year}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Interests Section */}
            {hasData(data.interests) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaHeart /> Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, idx) => (
                    <span key={idx} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                      {interest.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* --- RIGHT MAIN CONTENT --- */}
          <main className="p-6 md:p-8 bg-white">
            
            {/* Summary Section */}
            {data.summary && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-3 border-b-2 border-blue-500 pb-2">
                  Professional Summary
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Experience Section */}
            {hasData(data.experience) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaBriefcase /> Experience
                </h3>
                <div className="space-y-6">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <h4 className="font-bold text-slate-800">{exp.jobTitle}</h4>
                      <div className="flex justify-between items-baseline text-sm text-slate-500 mb-2">
                        <span className="font-medium">{exp.company}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {exp.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {hasData(data.education) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaGraduationCap /> Education
                </h3>
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                      <p className="text-sm text-slate-600">{edu.university}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {edu.location} • {edu.graduationYear}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {hasData(data.projects) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaProjectDiagram /> Projects
                </h3>
                <div className="space-y-4">
                  {data.projects.map((proj, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <h4 className="font-bold text-slate-800">{proj.title}</h4>
                      <p className="text-sm text-slate-600 mt-1 mb-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(proj.technologiesUsed) && proj.technologiesUsed.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-2 inline-block">
                          View Code &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {hasData(data.achievements) && (
              <section className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-blue-500 pb-2 flex items-center gap-2">
                  <FaAward /> Achievements
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                  {data.achievements.map((ach, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{ach.title}</span> ({ach.year})
                      <p className="text-xs text-slate-500">{ach.extraInformation}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </main>
        </div>
      </div>

      {/* Print Button - Outside the PDF Capture Area */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Resume3;