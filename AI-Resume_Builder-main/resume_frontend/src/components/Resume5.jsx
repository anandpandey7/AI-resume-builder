import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

/* ── Helpers ── */
const has = (v) => {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim().length > 0;
  return true;
};

/* ── Modern Section: Left-accented typography ── */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "22px" }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ width: "4px", height: "18px", background: "#10b981", marginRight: "10px", borderRadius: "2px" }}></div>
        <h2 style={{
        fontSize: "13px",
        fontWeight: 800,
        color: "#1e293b",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        }}>
        {title}
        </h2>
    </div>
    <div style={{ paddingLeft: "14px" }}>
      {children}
    </div>
  </div>
);

/* ── Modern Subheading: Flex-spaced rows ── */
const SubHeading = ({ main, sub, rightTop, rightBottom }) => (
  <div style={{ marginBottom: "6px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>{main}</div>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>{rightTop}</div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "1px" }}>
      <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{sub}</div>
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{rightBottom}</div>
    </div>
  </div>
);

export default function Resume5({ data }) {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    // Increased pixelRatio for ultra-crisp text in the PDF
    toPng(resumeRef.current, { quality: 1.0, pixelRatio: 3 })
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .modern-resume * { box-sizing: border-box; margin: 0; padding: 0; }
        .modern-list { list-style: none; }
        .modern-list li { position: relative; margin-bottom: 5px; padding-left: 18px; font-size: 13px; color: #334155; line-height: 1.5; }
        .modern-list li::before { content: "→"; position: absolute; left: 0; color: #10b981; font-weight: bold; font-size: 11px; top: 1px; }
      `}</style>

      <div
        className="modern-resume"
        ref={resumeRef}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "50px 60px",
          fontFamily: "'Inter', sans-serif",
          color: "#334155",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ marginBottom: "32px", textAlign: "left" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: "10px" }}>
            {info.fullName}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: "13px", color: "#64748b" }}>
            {has(info.email) && <span style={{ display: "flex", alignItems: "center" }}>✉ {info.email}</span>}
            {has(info.phoneNumber) && <span>📱 {info.phoneNumber}</span>}
            {has(info.location) && <span>📍 {info.location}</span>}
            {has(info.linkedIn) && <span>🔗 {info.linkedIn.split('/').pop()}</span>}
          </div>
        </div>

        {/* ── SUMMARY ── */}
        {has(data.summary) && (
          <Section title="Overview">
            <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#475569" }}>{data.summary}</p>
          </Section>
        )}

        {/* ── EXPERIENCE ── */}
        {has(data.experience) && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <SubHeading
                  main={exp.jobTitle}
                  sub={exp.company || exp.organization}
                  rightTop={exp.duration}
                  rightBottom={exp.location}
                />
                <ul className="modern-list" style={{ marginTop: "8px" }}>
                  {exp.responsibility.split(/\n|•/).filter(r => r.trim()).map((r, ri) => (
                    <li key={ri}>{r.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {/* ── SKILLS ── */}
        {has(data.skills) && (
          <Section title="Skills & Tech">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {data.skills.map((s, i) => (
                <div key={i} style={{ fontSize: "13px", borderBottom: "1px solid #f1f5f9", paddingBottom: "4px" }}>
                  <strong style={{ color: "#0f172a" }}>{s.title}</strong>
                  {s.level && <span style={{ color: "#10b981", marginLeft: "6px", fontSize: "11px", fontWeight: 600 }}>[{s.level}]</span>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── EDUCATION ── */}
        {has(data.education) && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <SubHeading
                key={i}
                main={edu.university || edu.institution}
                sub={edu.degree}
                rightTop={edu.graduationYear || ""}
                rightBottom={edu.cgpa ? `GPA: ${edu.cgpa}` : edu.location}
              />
            ))}
          </Section>
        )}
      </div>

      {/* Action Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", paddingBottom: "50px" }}>
        <button
          onClick={handleDownload}
          style={{
            padding: "12px 36px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Download Executive Resume
        </button>
      </div>
    </>
  );
}