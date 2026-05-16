import React from "react";
import { Link } from "react-router"; 

export default function About() {
  return (
    <div className="min-h-screen bg-base-100 font-sans">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-base-200 via-base-100 to-base-300 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="badge badge-primary badge-outline px-4 py-3 text-sm font-semibold tracking-wider uppercase mb-6">Our Story</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            About AI Resume Builder
          </h1>
          <p className="text-xl md:text-2xl opacity-80 font-light leading-relaxed">
            Revolutionizing the way professionals create resumes. We combine cutting-edge artificial intelligence with beautiful design to help you land your dream job.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 lg:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-base-content">
                Our <span className="text-primary">Mission</span>
              </h2>
              <div className="space-y-6 text-lg opacity-80 leading-relaxed">
                <p>
                  At AI Resume Builder, we believe that everyone deserves a standout resume that showcases their unique skills and experiences. Our mission is to democratize professional resume creation by leveraging cutting-edge AI technology to help job seekers craft compelling resumes effortlessly.
                </p>
                <p>
                  Whether you're a recent graduate, a career changer, or an experienced professional, our platform adapts to your needs, providing personalized suggestions, industry-specific templates, and intelligent JD matching to get you past the ATS.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              {/* Decorative graphic instead of just text */}
              <div className="relative w-full aspect-video rounded-2xl bg-base-200 border border-base-300 shadow-2xl overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/50 transition-transform duration-300">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
                <svg className="w-32 h-32 text-primary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-base-content mb-4">
              Key Features
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">Discover the powerful tools we've built to accelerate your career growth.</p>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="card-title text-lg">AI-Powered Content</h3>
                <p className="opacity-75 text-sm mt-2">Generate tailored content suggestions based on your experience and the job you're applying for.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="card-title text-lg">Multiple Templates</h3>
                <p className="opacity-75 text-sm mt-2">Choose from a variety of professionally designed, ATS-friendly templates to match your style.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-content transition-colors mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="card-title text-lg">Real-time Preview</h3>
                <p className="opacity-75 text-sm mt-2">See your resume come to life as you type, with instant formatting and layout adjustments.</p>
              </div>
            </div>

            {/* Feature 4 (New JD Matcher) */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-info/10 flex items-center justify-center text-info group-hover:bg-info group-hover:text-info-content transition-colors mb-4">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="card-title text-lg">JD Matcher</h3>
                <p className="opacity-75 text-sm mt-2">Paste a Job Description and let our AI tailor your PDF resume specifically for that role.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl p-12 text-primary-content relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-lg opacity-90 mb-10 relative z-10 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their job search with AI Resume Builder.
            </p>
            <Link to="/generate-resume" className="btn btn-neutral btn-lg border-none hover:scale-105 transition-transform rounded-full px-10 relative z-10">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
