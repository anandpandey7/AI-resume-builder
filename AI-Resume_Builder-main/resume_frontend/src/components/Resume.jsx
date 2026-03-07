import React, { useRef } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  // Helper function to check if array has data
  const hasData = (arr) => Array.isArray(arr) && arr.length > 0;

  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;

    toPng(resumeRef.current, {
      quality: 1.0,
      pixelRatio: 2, // Higher quality for better color capture
      backgroundColor: "#ffffff", // Ensure white background
    })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add image with full color support
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
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto shadow-2xl rounded-lg p-8 space-y-6 bg-white text-gray-800 border border-gray-200 transition-all duration-300"
      >
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-600">
            {data.personalInformation?.fullName || "Your Name"}
          </h1>
          {data.personalInformation?.location && (
            <p className="text-lg text-gray-500">
              {data.personalInformation.location}
            </p>
          )}

          <div className="flex justify-center space-x-4 mt-2">
            {data.personalInformation?.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center text-blue-600 hover:underline"
              >
                <FaEnvelope className="mr-2" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation?.phoneNumber && (
              <p className="flex items-center text-gray-500">
                <FaPhone className="mr-2" />{" "}
                {data.personalInformation.phoneNumber}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-2">
            {data.personalInformation?.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {data.personalInformation?.linkedIn && (
              <a
                href={data.personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {data.summary && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Summary</h2>
              <p className="text-gray-700">{data.summary}</p>
            </section>
          </>
        )}

        {/* Skills Section */}
        {hasData(data.skills) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700 font-medium"
                  >
                    {skill.title} -{" "}
                    <span className="ml-1 font-semibold">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Experience Section */}
        {hasData(data.experience) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Experience</h2>
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-blue-50 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                  <p className="text-gray-500">
                    {exp.company} | {exp.location}
                  </p>
                  <p className="text-gray-400">{exp.duration}</p>
                  <p className="mt-2 text-gray-600">
                    {exp.responsibility}
                  </p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Education Section */}
        {hasData(data.education) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Education</h2>
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-blue-50 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-500">
                    {edu.university}, {edu.location}
                  </p>
                  <p className="text-gray-400">
                    🎓 Graduation Year: {edu.graduationYear}
                  </p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Certifications Section */}
        {hasData(data.certifications) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">
                Certifications
              </h2>
              {data.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-blue-50 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{cert.title}</h3>
                  <p className="text-gray-500">
                    {cert.issuingOrganization} - {cert.year}
                  </p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Projects Section */}
        {hasData(data.projects) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Projects</h2>
              {data.projects.map((proj, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-blue-50 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{proj.title}</h3>
                  <p className="text-gray-600">
                    {proj.description}
                  </p>
                  <p className="text-gray-500">
                    🛠 Technologies:{" "}
                    {Array.isArray(proj.technologiesUsed)
                      ? proj.technologiesUsed.join(", ")
                      : proj.technologiesUsed || ""}
                  </p>

                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🔗 GitHub Link
                    </a>
                  )}
                </div>
              ))}
            </section>
          </>
        )}

        {/* Achievements Section */}
        {hasData(data.achievements) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">
                Achievements
              </h2>
              {data.achievements.map((ach, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg shadow-md bg-blue-50 border border-blue-200"
                >
                  <h3 className="text-xl font-bold text-gray-800">{ach.title}</h3>
                  <p className="text-gray-500">{ach.year}</p>
                  <p className="text-gray-600">
                    {ach.extraInformation}
                  </p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* Languages Section */}
        {hasData(data.languages) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Languages</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* Interests Section */}
        {hasData(data.interests) && (
          <>
            <div className="divider"></div>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Interests</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {data.interests.map((interest, index) => (
                  <li key={index}>{interest.name}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      <section className="flex justify-center mt-4">
        <div onClick={handleDownloadPdf} className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white">
          Print
        </div>
      </section>
    </>
  );
};

export default Resume;