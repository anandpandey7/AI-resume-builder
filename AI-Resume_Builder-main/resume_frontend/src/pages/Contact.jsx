import React from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const teamMembers = [
    { name: "Anand Raj", role: "Team Member" },
    { name: "Ayushmman Singh", role: "Team Member" },
    { name: "Nishant Singh", role: "Team Member" },
    { name: "Ravi", role: "Team Member" },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-extrabold text-base-content sm:text-5xl tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
            We'd love to hear from you. Feel free to reach out using the form below or check out our open-source project repository.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-base-100 rounded-3xl shadow-2xl p-8 lg:p-10 border border-base-300/50">
            <h3 className="text-2xl font-bold mb-6 text-base-content">Send us a message</h3>
            <form className="space-y-6">
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text font-medium text-base-content/80">Your Name</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  className="input input-bordered w-full focus:input-primary transition-all duration-300 bg-base-200/50" 
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text font-medium text-base-content/80">Email Address</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com" 
                  className="input input-bordered w-full focus:input-primary transition-all duration-300 bg-base-200/50" 
                />
              </div>
              <div className="form-control">
                <label htmlFor="message" className="label">
                  <span className="label-text font-medium text-base-content/80">Message</span>
                </label>
                <textarea 
                  id="message" 
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="textarea textarea-bordered w-full focus:textarea-primary transition-all duration-300 bg-base-200/50 resize-none h-32"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="btn btn-primary w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 text-lg rounded-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Project & Team Info Section */}
          <div className="space-y-8">
            
            {/* GitHub Project Card */}
            <div className="group bg-gradient-to-br from-base-100 to-base-200 rounded-3xl p-8 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <FaGithub className="text-9xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-base-content">
                  <FaGithub className="text-3xl text-primary" />
                  Project Repository
                </h3>
                <p className="text-base-content/70 mb-8 leading-relaxed">
                  Our AI Resume Builder is actively developed. You can explore the complete source code, report issues, or contribute on our GitHub repository.
                </p>
                <a 
                  href="https://github.com/anandpandey7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline hover:btn-primary gap-3 rounded-xl border-2"
                >
                  <FaGithub className="text-xl" />
                  Visit @anandpandey7
                </a>
              </div>
            </div>

            {/* Team Members Card */}
            <div className="bg-base-100 rounded-3xl shadow-xl p-8 border border-base-300/50">
              <h3 className="text-2xl font-bold mb-6 text-base-content">Meet the Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-base-200/30 hover:bg-base-200/80 transition-colors border border-transparent hover:border-base-300"
                  >
                    <div className="avatar placeholder">
                      <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-12 shadow-inner">
                        <span className="text-lg font-bold">{member.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">{member.name}</h4>
                      <p className="text-xs font-medium text-base-content/50 uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row gap-6 p-4">
               <div className="flex items-center gap-4 text-base-content/70 hover:text-primary transition-colors cursor-pointer">
                  <div className="bg-base-100 p-3 rounded-full shadow-md">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <span className="font-medium">contact@airesume.com</span>
               </div>
               <div className="flex items-center gap-4 text-base-content/70 hover:text-primary transition-colors cursor-pointer">
                  <div className="bg-base-100 p-3 rounded-full shadow-md">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <span className="font-medium">India</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
