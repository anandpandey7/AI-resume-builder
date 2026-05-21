import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { generateResume, saveResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addSavedResume } from "../store/resumeSlice";

// Import all templates
import Resume from "../components/Resume";
import Resume2 from "../components/Resume2";
import Resume3 from "../components/Resume3";
import Resume4 from "../components/Resume4";
import Resume5 from "../components/Resume5";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Durgesh Kumar Tiwari",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);
  
  const [resumeTitle, setResumeTitle] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialData) {
      const passedData = location.state.initialData.data || location.state.initialData;
      setData(passedData);
      reset(passedData);
      setShowFormUI(true);
      setShowPromptInput(false);
      // Clean up state so refresh doesn't keep reloading it if unwanted
      window.history.replaceState({}, document.title);
    }
  }, [location.state, reset]);
  
  // States for Template Selection
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  const onSubmit = (formData) => {
    setData({ ...formData });
    setShowFormUI(false);
    setShowPromptInput(false);
    setShowTemplatePicker(true); // Move to selection after form
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const responseData = await generateResume(description);
      reset(responseData.data);

      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
    } catch (error) {
      console.log(error);
      toast.error("Error Generating Resume!");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  const handleSaveToProfile = async () => {
    if (!resumeTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: resumeTitle,
        data: data
      };
      const response = await saveResume(payload);
      dispatch(addSavedResume({ ...response, createdAt: new Date().toISOString() })); 
      toast.success("Resume Saved Successfully!");
      document.getElementById('save_modal').close();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume");
    } finally {
      setLoading(false);
      setResumeTitle("");
    }
  };

  const templates = [
    { id: 1, name: "Classic Serif", Component: Resume },
    { id: 2, name: "Modern Clean", Component: Resume2 },
    { id: 3, name: "Minimalist", Component: Resume3 },
    { id: 4, name: "LaTeX Style", Component: Resume4 },
    { id: 5, name: "Executive Tech", Component: Resume5 },
  ];

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full bg-base-100 text-base-content"
      />
    </div>
  );

  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="form-control w-full mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm mt-2"
            >
              <FaTrash className="w-5 h-5 text-base-content" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))
          }
          className="btn btn-secondary btn-sm mt-2 flex items-center"
        >
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <BiBook className="text-accent" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>
            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>
            {renderFieldArray(skillsFields, "Skills", "skills", ["title", "level"])}
            {renderFieldArray(experienceFields, "Experience", "experience", ["jobTitle", "company", "location", "duration", "responsibility"])}
            {renderFieldArray(educationFields, "Education", "education", ["degree", "university", "location", "graduationYear"])}
            {renderFieldArray(certificationsFields, "Certifications", "certifications", ["title", "issuingOrganization", "year"])}
            {renderFieldArray(projectsFields, "Projects", "projects", ["title", "description", "technologiesUsed", "githubLink"])}
            <div className="flex gap-3 mt-16 p-4 rounded-xl">
              <div className="flex-1">{renderFieldArray(languagesFields, "Languages", "languages", ["name"])}</div>
              <div className="flex-1">{renderFieldArray(interestsFields, "Interests", "interests", ["name"])}</div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
    return (
      <div className="bg-base-200 shadow-lg rounded-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaBrain className="text-accent" /> AI Resume Description Input
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Enter a detailed description about yourself to generate your professional resume.
        </p>
        <textarea
          disabled={loading}
          className="textarea textarea-bordered w-full h-48 mb-6 resize-none"
          placeholder="e.g. I am a Full Stack Developer with 3 years of experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-center gap-4">
          <button disabled={loading} onClick={handleGenerate} className="btn btn-primary flex items-center gap-2">
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane /> Generate Resume
          </button>
          <button onClick={handleClear} className="btn btn-secondary flex items-center gap-2">
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }

  function ShowTemplatePickerUI() {
    return (
      <div className="w-full p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-center">Select Resume Template</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={`p-6 rounded-2xl border-4 cursor-pointer transition-all bg-base-200 hover:shadow-xl ${
                selectedTemplate === tpl.id ? "border-primary scale-105" : "border-transparent"
              }`}
            >
              <div className="h-40 bg-base-300 rounded-lg mb-4 flex items-center justify-center text-5xl">
                📄
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{tpl.name}</span>
                {selectedTemplate === tpl.id && <FaCheckCircle className="text-primary" />}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setShowTemplatePicker(false);
            setShowResumeUI(true);
          }}
          className="btn btn-primary btn-lg mt-12 px-16"
        >
          Confirm Design
        </button>
      </div>
    );
  }

  function showResume() {
    // Determine which component to render
    const SelectedComponent = templates.find((t) => t.id === selectedTemplate).Component;

    return (
      <div className="flex flex-col items-center">
        <SelectedComponent data={data} />

        <div className="flex mt-5 justify-center gap-2">
          <div
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);
              setShowTemplatePicker(false);
            }}
            className="btn btn-accent"
          >
            Generate Another
          </div>
          <div
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(false);
              setShowResumeUI(false);
              setShowTemplatePicker(true);
            }}
            className="btn btn-info"
          >
            Change Template
          </div>
          <div
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);
              setShowTemplatePicker(false);
            }}
            className="btn btn-success"
          >
            Edit
          </div>
          <div
            onClick={() => document.getElementById('save_modal').showModal()}
            className="btn btn-warning"
          >
            Save to Profile
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center font-sans">
      {showPromptInput && ShowInputField()}
      {showFormUI && showFormFunction()}
      {showTemplatePicker && ShowTemplatePickerUI()}
      {showResumeUI && showResume()}

      <dialog id="save_modal" className="modal">
        <div className="modal-box bg-base-100">
          <h3 className="font-bold text-lg mb-4 text-base-content">Save Resume</h3>
          <input 
            type="text" 
            placeholder="e.g. Frontend Developer Resume" 
            className="input input-bordered w-full text-base-content" 
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSaveToProfile} disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Save"}
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GenerateResume;