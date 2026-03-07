import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const has = (val) => {
  if (!val) return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "string") return val.trim().length > 0;
  return true;
};

const Tag = ({ children }) => (
  <span style={{
    display: "inline-block",
    background: "#f0f4ff",
    color: "#3b5bdb",
    border: "1px solid #c5d0fa",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
    padding: "2px 8px",
    marginRight: "5px",
    marginBottom: "5px",
    letterSpacing: "0.02em",
  }}>{children}</span>
);

const SectionTitle = ({ children }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    marginTop: "6px",
  }}>
    <span style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#1a1a2e",
    }}>{children}</span>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #3b5bdb44, transparent)" }} />
  </div>
);

export default function Resume2({ data }) {
  const resumeRef = useRef(null);

  const handleDownloadPdf = async () => {
    const element = resumeRef.current;

    // FIXED: Force 820px width before snapshot so right side is never clipped
    const RESUME_WIDTH = 820;
    const prevWidth    = element.style.width;
    const prevMaxWidth = element.style.maxWidth;

    element.style.width    = `${RESUME_WIDTH}px`;
    element.style.maxWidth = `${RESUME_WIDTH}px`;

    // Let browser reflow
    await new Promise((r) => setTimeout(r, 120));

    const captureH = element.scrollHeight;

    try {
      const dataUrl = await toPng(element, {
        quality : 1.0,
        pixelRatio: 2,
        width   : RESUME_WIDTH,
        height  : captureH,
      });

      // Restore
      element.style.width    = prevWidth;
      element.style.maxWidth = prevMaxWidth;

      // Custom PDF height = proportional to content → zero white gap
      const pdfW = 210;
      const pdfH = pdfW * (captureH / RESUME_WIDTH);

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [pdfW, pdfH] });
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, pdfH);
      pdf.save(`${data.personalInformation.fullName}_Resume.pdf`);
    } catch (err) {
      element.style.width    = prevWidth;
      element.style.maxWidth = prevMaxWidth;
      console.error(err);
    }
  };

  const info = data.personalInformation;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .resume-root * { box-sizing: border-box; }
        .resume-root a { color: inherit; text-decoration: none; }
        .exp-card:not(:last-child) { border-bottom: 1px dashed #e2e8f0; padding-bottom: 14px; margin-bottom: 14px; }
      `}</style>

      <div
        className="resume-root"
        ref={resumeRef}
        style={{
          width: "820px",
          maxWidth: "820px",
          margin: "0 auto",
          background: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          color: "#1a1a2e",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          alignItems: "stretch",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          /* no minHeight — content determines height naturally */
        }}
      >
        {/* ── SIDEBAR ── */}
        <aside style={{
          background: "#1a1a2e",
          color: "#e8ecf5",
          padding: "36px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          alignSelf: "stretch",
        }}>
          <div>
            <div style={{ width: "52px", height: "4px", background: "linear-gradient(to right, #4c6ef5, #748ffc)", borderRadius: "2px", marginBottom: "12px" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, lineHeight: 1.2, color: "#ffffff", margin: 0 }}>
              {info.fullName.split(" ").map((w, i) => (
                <span key={i} style={{ display: "block", color: i === 0 ? "#748ffc" : "#ffffff" }}>{w}</span>
              ))}
            </h1>
          </div>

          <div>
            <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#748ffc", fontWeight: 600, marginBottom: "10px" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "11.5px", color: "#c5cee0" }}>
              {has(info.email) && <a href={`mailto:${info.email}`} style={{ display: "flex", alignItems: "center", gap: "7px" }}><span style={{ color: "#748ffc" }}>✉</span> {info.email}</a>}
              {has(info.phoneNumber) && <span style={{ display: "flex", alignItems: "center", gap: "7px" }}><span style={{ color: "#748ffc" }}>📞</span> {info.phoneNumber}</span>}
              {has(info.location) && <span style={{ display: "flex", alignItems: "center", gap: "7px" }}><span style={{ color: "#748ffc" }}>📍</span> {info.location}</span>}
              {has(info.linkedIn) && <a href={info.linkedIn} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "7px" }}><span style={{ color: "#748ffc" }}>in</span> LinkedIn</a>}
              {has(info.gitHub) && <a href={info.gitHub} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "7px" }}><span style={{ color: "#748ffc" }}>⌥</span> GitHub</a>}
            </div>
          </div>

          {has(data.skills) && (
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#748ffc", fontWeight: 600, marginBottom: "10px" }}>Skills</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {data.skills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                      <span style={{ color: "#e8ecf5", fontWeight: 500 }}>{s.title}</span>
                      <span style={{ color: "#748ffc", fontSize: "10px" }}>{s.level}</span>
                    </div>
                    <div style={{ height: "3px", background: "#2d2d4e", borderRadius: "2px" }}>
                      <div style={{ height: "100%", borderRadius: "2px", background: "linear-gradient(to right, #4c6ef5, #748ffc)", width: s.level === "Expert" ? "95%" : s.level === "Advanced" ? "80%" : s.level === "Intermediate" ? "60%" : "40%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {has(data.education) && (
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#748ffc", fontWeight: 600, marginBottom: "10px" }}>Education</p>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#ffffff", margin: "0 0 2px" }}>{edu.degree}</p>
                  <p style={{ fontSize: "11px", color: "#9aa5c4", margin: "0 0 2px" }}>{edu.university}</p>
                  {edu.location && <p style={{ fontSize: "10px", color: "#6b7da8", margin: "0 0 2px" }}>{edu.location}</p>}
                  {edu.graduationYear && <p style={{ fontSize: "10px", color: "#748ffc", margin: 0 }}>Grad: {edu.graduationYear}</p>}
                </div>
              ))}
            </div>
          )}

          {has(data.languages) && (
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#748ffc", fontWeight: 600, marginBottom: "10px" }}>Languages</p>
              {data.languages.map((l, i) => <p key={i} style={{ fontSize: "12px", color: "#c5cee0", margin: "0 0 4px" }}>• {l.name}</p>)}
            </div>
          )}

          {has(data.interests) && (
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#748ffc", fontWeight: 600, marginBottom: "10px" }}>Interests</p>
              {data.interests.map((it, i) => <p key={i} style={{ fontSize: "12px", color: "#c5cee0", margin: "0 0 4px" }}>• {it.name}</p>)}
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ padding: "36px 32px", display: "flex", flexDirection: "column", gap: "26px" }}>

          {has(data.summary) && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#3d4455", margin: 0 }}>{data.summary}</p>
            </section>
          )}

          {has(data.experience) && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div>
                {data.experience.map((exp, i) => (
                  <div key={i} className="exp-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px" }}>
                      <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1a1a2e" }}>{exp.jobTitle}</h3>
                      {exp.duration && <span style={{ fontSize: "11px", color: "#748ffc", fontWeight: 500, whiteSpace: "nowrap", marginLeft: "8px" }}>{exp.duration}</span>}
                    </div>
                    <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#5a6685", fontWeight: 500 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                    {has(exp.responsibility) && <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.7, color: "#3d4455" }}>{exp.responsibility}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {has(data.projects) && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {data.projects.map((proj, i) => (
                  <div key={i} style={{ background: "#f7f9ff", border: "1px solid #e2e8f8", borderLeft: "3px solid #4c6ef5", borderRadius: "6px", padding: "13px 15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                      <h3 style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "#1a1a2e" }}>{proj.title}</h3>
                      {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#4c6ef5", fontWeight: 600 }}>↗ GitHub</a>}
                    </div>
                    {has(proj.description) && <p style={{ margin: "0 0 8px", fontSize: "12px", lineHeight: 1.65, color: "#3d4455" }}>{proj.description}</p>}
                    {has(proj.technologiesUsed) && (
                      <div>{(Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed : proj.technologiesUsed.split(",")).map((t, ti) => <Tag key={ti}>{t.trim()}</Tag>)}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {has(data.certifications) && (
            <section>
              <SectionTitle>Certifications</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.certifications.map((cert, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f7f9ff", borderRadius: "5px", border: "1px solid #e2e8f8" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1a1a2e" }}>{cert.title}</p>
                      {cert.issuingOrganization && <p style={{ margin: 0, fontSize: "11px", color: "#5a6685" }}>{cert.issuingOrganization}</p>}
                    </div>
                    {cert.year && <span style={{ fontSize: "11px", color: "#748ffc", fontWeight: 600 }}>{cert.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {has(data.achievements) && (
            <section>
              <SectionTitle>Achievements</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {data.achievements.map((ach, i) => (
                  <div key={i} style={{ paddingLeft: "14px", borderLeft: "2px solid #748ffc" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#1a1a2e" }}>{ach.title}</p>
                      {ach.year && <span style={{ fontSize: "11px", color: "#748ffc" }}>{ach.year}</span>}
                    </div>
                    {has(ach.extraInformation) && <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#3d4455", lineHeight: 1.6 }}>{ach.extraInformation}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <button
          onClick={handleDownloadPdf}
          style={{
            padding: "12px 32px",
            background: "linear-gradient(135deg, #4c6ef5, #748ffc)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 14px rgba(76, 110, 245, 0.35)",
            letterSpacing: "0.03em",
          }}
        >
          ↓ Download PDF
        </button>
      </div>
    </>
  );
}