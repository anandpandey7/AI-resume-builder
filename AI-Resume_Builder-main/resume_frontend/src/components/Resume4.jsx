import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

/* ── helpers ── */
const has = (v) => {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim().length > 0;
  return true;
};

/* ── Section heading: large, bold, small-caps, with full-width rule ── */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "12px" }}>
    <div style={{
      fontSize: "14.5px",
      fontWeight: 700,
      fontVariant: "small-caps",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      color: "#000",
      marginBottom: "3px",
      fontFamily: "'Latin Modern Roman', 'Computer Modern', Georgia, serif",
    }}>
      {title}
    </div>
    <div style={{ borderBottom: "1.4px solid #000", marginBottom: "7px" }} />
    {children}
  </div>
);

/* ── resumeSubheading: two-column tabular row ── */
const SubHeading = ({ col1, col2, col3, col4 }) => (
  <div style={{ marginBottom: "1px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontWeight: 700, fontSize: "12.5px" }}>{col1}</span>
      <span style={{ fontSize: "12px" }}>{col2}</span>
    </div>
    {(col3 || col4) && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontStyle: "italic", fontSize: "12px" }}>{col3}</span>
        <span style={{ fontStyle: "italic", fontSize: "12px" }}>{col4}</span>
      </div>
    )}
  </div>
);

/* ── bullet list item ── */
const Item = ({ children }) => (
  <li style={{ fontSize: "12px", lineHeight: 1.55, marginBottom: "1px", color: "#111" }}>
    {children}
  </li>
);

export default function Resume4({ data }) {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    toPng(resumeRef.current, { quality: 1.0, pixelRatio: 2 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(dataUrl, "PNG", 0, 0, 210, 0);
        pdf.save(`${data.personalInformation.fullName}_Resume.pdf`);
      })
      .catch(console.error);
  };

  const info = data.personalInformation;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        .latex-resume * { box-sizing: border-box; margin: 0; padding: 0; }
        .latex-resume a { color: #000; text-decoration: none; }
        .latex-resume a:hover { text-decoration: underline; }
        .latex-item-list {
          list-style-type: disc;
          padding-left: 18px;
          margin-bottom: 5px;
        }
        .latex-item-list li::marker { font-size: 10px; }
      `}</style>

      <div
        className="latex-resume"
        ref={resumeRef}
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#fff",
          padding: "48px 52px",
          fontFamily: "'EB Garamond', 'Latin Modern Roman', Georgia, serif",
          color: "#000",
          fontSize: "12.5px",
          lineHeight: 1.5,
          boxShadow: "0 2px 24px rgba(0,0,0,0.10)",
        }}
      >

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 700,
            fontVariant: "small-caps",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "6px",
            fontFamily: "'EB Garamond', Georgia, serif",
          }}>
            {info.fullName}
          </h1>

          <div style={{ fontSize: "12px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", color: "#111" }}>
            {has(info.phoneNumber) && <span>📞 {info.phoneNumber}</span>}
            {has(info.email) && (
              <span>✉ <a href={`mailto:${info.email}`}>{info.email}</a></span>
            )}
            {has(info.linkedIn) && (
              <span>in <a href={info.linkedIn} target="_blank" rel="noreferrer">{info.linkedIn.replace(/https?:\/\/(www\.)?/, "")}</a></span>
            )}
            {has(info.gitHub) && (
              <span>⌥ <a href={info.gitHub} target="_blank" rel="noreferrer">{info.gitHub.replace(/https?:\/\/(www\.)?/, "")}</a></span>
            )}
            {has(info.location) && <span>📍 {info.location}</span>}
          </div>
        </div>

        {/* ── PROFILE / SUMMARY ── */}
        {has(data.summary) && (
          <Section title="Profile">
            <ul className="latex-item-list">
              <Item>{data.summary}</Item>
            </ul>
          </Section>
        )}

        {/* ── EDUCATION ── */}
        {has(data.education) && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <SubHeading
                key={i}
                col1={edu.university || edu.institution}
                col2={edu.location || ""}
                col3={edu.degree}
                col4={edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.graduationYear ? `${edu.graduationYear}` : ""}
              />
            ))}
          </Section>
        )}

        {/* ── TECHNICAL SKILLS ── */}
        {has(data.skills) && (
          <Section title="Technical Skills">
            <ul className="latex-item-list">
              {/* Group skills by level or just list them */}
              {data.skills.map((s, i) => (
                <Item key={i}>
                  <strong>{s.title}</strong>{s.level ? ` — ${s.level}` : ""}
                </Item>
              ))}
            </ul>
          </Section>
        )}

        {/* ── EXPERIENCE ── */}
        {has(data.experience) && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <SubHeading
                  col1={exp.company || exp.organization}
                  col2={exp.duration || ""}
                  col3={exp.jobTitle}
                  col4={exp.location || ""}
                />
                {has(exp.responsibility) && (
                  <ul className="latex-item-list" style={{ marginTop: "3px" }}>
                    {exp.responsibility.split(/\n|•/).filter(r => r.trim()).map((r, ri) => (
                      <Item key={ri}>{r.trim()}</Item>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* ── PROJECTS ── */}
        {has(data.projects) && (
          <Section title="Projects">
            {data.projects.map((proj, i) => {
              const techs = Array.isArray(proj.technologiesUsed)
                ? proj.technologiesUsed.join(", ")
                : proj.technologiesUsed || "";
              return (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <SubHeading
                    col1={<>{proj.title}{techs ? <span style={{ fontWeight: 400, fontStyle: "normal", fontSize: "11.5px" }}> | <em>{techs}</em></span> : ""}</>}
                    col2=""
                    col3={proj.subtitle || proj.category || ""}
                    col4=""
                  />
                  {has(proj.description) && (
                    <ul className="latex-item-list" style={{ marginTop: "3px" }}>
                      {proj.description.split(/\n|\.(?=\s)/).filter(d => d.trim().length > 4).map((d, di) => (
                        <Item key={di}>{d.trim().replace(/\.$/, "")}.</Item>
                      ))}
                    </ul>
                  )}
                  {proj.githubLink && (
                    <div style={{ marginTop: "2px", paddingLeft: "18px", fontSize: "11.5px" }}>
                      <a href={proj.githubLink} target="_blank" rel="noreferrer">🔗 {proj.githubLink}</a>
                    </div>
                  )}
                </div>
              );
            })}
          </Section>
        )}

        {/* ── CERTIFICATIONS ── */}
        {has(data.certifications) && (
          <Section title="Certifications">
            <ul className="latex-item-list">
              {data.certifications.map((cert, i) => (
                <Item key={i}>
                  <strong>{cert.title}</strong>
                  {cert.issuingOrganization ? ` — ${cert.issuingOrganization}` : ""}
                  {cert.year ? ` (${cert.year})` : ""}
                </Item>
              ))}
            </ul>
          </Section>
        )}

        {/* ── ACHIEVEMENTS ── */}
        {has(data.achievements) && (
          <Section title="Achievements">
            <ul className="latex-item-list">
              {data.achievements.map((ach, i) => (
                <Item key={i}>
                  <strong>{ach.title}</strong>
                  {ach.year ? ` (${ach.year})` : ""}
                  {ach.extraInformation ? ` — ${ach.extraInformation}` : ""}
                </Item>
              ))}
            </ul>
          </Section>
        )}

        {/* ── LANGUAGES ── */}
        {has(data.languages) && (
          <Section title="Languages">
            <ul className="latex-item-list">
              {data.languages.map((l, i) => (
                <Item key={i}>{l.name}{l.proficiency ? ` — ${l.proficiency}` : ""}</Item>
              ))}
            </ul>
          </Section>
        )}

        {/* ── INTERESTS ── */}
        {has(data.interests) && (
          <Section title="Interests">
            <p style={{ fontSize: "12px" }}>
              {data.interests.map(it => it.name).join(" · ")}
            </p>
          </Section>
        )}

      </div>

      {/* Download */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 28px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ↓ Download PDF
        </button>
      </div>
    </>
  );
}