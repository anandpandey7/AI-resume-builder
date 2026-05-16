import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="bg-base-100 overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative hero min-h-[90vh] overflow-hidden bg-gradient-to-br from-base-200 via-base-100 to-base-300">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent"></div>
        <div className="hero-content text-center z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Create Your Perfect Resume with AI
            </h1>
            <p className="py-6 text-xl md:text-2xl opacity-80 font-light max-w-2xl mx-auto">
              Build a professional resume in minutes. Describe yourself, and let our intelligent engine craft a winning profile that stands out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to={"/generate-resume"} className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all rounded-full px-8">
                Build Resume Now
              </Link>
              <Link to={"/jd-resume"} className="btn btn-outline btn-secondary btn-lg shadow-sm hover:shadow-secondary/50 hover:-translate-y-1 transition-all rounded-full px-8 bg-base-100/50 backdrop-blur-sm">
                Try JD Matcher
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Tailor Resume Section */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-6">
              <div className="badge badge-secondary badge-outline px-4 py-3 text-sm font-semibold tracking-wider uppercase mb-2">New Feature</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Tailor Your Resume to <span className="text-secondary">Any Job</span>
              </h2>
              <p className="text-lg opacity-75 leading-relaxed">
                Stop guessing what recruiters want. Paste the job description, upload your existing resume, and let our system instantly analyze the match. Discover missing keywords and optimize your profile to beat the ATS.
              </p>
              <div className="pt-4">
                <Link to={"/jd-resume"} className="btn btn-secondary btn-lg hover:scale-105 transition-transform shadow-lg shadow-secondary/30 rounded-full px-8">
                  Analyze My Match
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="mockup-window border border-base-300 bg-base-200 shadow-2xl hover:shadow-secondary/20 transition-shadow duration-500 rounded-3xl">
                <div className="flex justify-center px-4 py-16 bg-base-100 flex-col items-center space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="w-full max-w-sm p-4 rounded-xl border border-base-300 bg-base-200/80 backdrop-blur-md shadow-sm flex items-center gap-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-base-300 rounded w-3/4"></div>
                      <div className="h-2 bg-base-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary animate-bounce z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="w-full max-w-sm p-4 rounded-xl border border-base-300 bg-base-200/80 backdrop-blur-md shadow-sm flex items-center gap-4 z-10">
                     <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm">PDF</div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-base-300 rounded w-full"></div>
                      <div className="h-2 bg-base-300 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg opacity-75">Everything you need to build a standout resume and land your dream job faster.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mb-4 group-hover:bg-primary group-hover:text-primary-content transition-colors">🚀</div>
                <h3 className="card-title text-xl">AI-Powered</h3>
                <p className="opacity-75 mt-2">
                  Our advanced AI analyzes your input and generates tailored, compelling content instantly.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-4xl mb-4 group-hover:bg-secondary group-hover:text-secondary-content transition-colors">📄</div>
                <h3 className="card-title text-xl">Multiple Templates</h3>
                <p className="opacity-75 mt-2">
                  Choose from a variety of professionally designed, ATS-friendly resume templates.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="card bg-base-100/80 backdrop-blur border border-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-4xl mb-4 group-hover:bg-accent group-hover:text-accent-content transition-colors">🎯</div>
                <h3 className="card-title text-xl">Job-Specific</h3>
                <p className="opacity-75 mt-2">
                  Optimize your resume for specific job roles and industries with our matching tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-lg opacity-75">See what others are saying about their success using our platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="card bg-base-200/50 border border-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex gap-1 text-warning mb-4">
                  {/* Stars */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg font-medium italic opacity-90">
                  "This AI resume maker saved me so much time! My resume looks
                  professional and got me multiple interviews within a week."
                </p>
                <div className="flex items-center mt-6">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="John Doe"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-base-content">David Miller</h4>
                    <p className="text-sm opacity-70">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="card bg-base-200/50 border border-base-200 shadow-lg hover:shadow-xl transition-shadow">
               <div className="card-body">
                <div className="flex gap-1 text-warning mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg font-medium italic opacity-90">
                  "I love the templates and the ease of use. The new JD matching tool helped me tailor my application perfectly!"
                </p>
                <div className="flex items-center mt-6">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Jane Smith"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-base-content">Sarah Jenkins</h4>
                    <p className="text-sm opacity-70">Marketing Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mb-10 text-xl font-light opacity-90 max-w-2xl mx-auto">
            Join thousands of successful candidates who built their professional brand with our AI tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to={"/generate-resume"} className="btn btn-neutral btn-lg border-none hover:scale-105 transition-transform rounded-full px-10 text-lg">
                 Start Building Free
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content border-t border-base-200">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Link to={'/'} className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                AI Resume Maker
              </Link>
              <p className="opacity-75 max-w-sm leading-relaxed text-sm">
                Empowering job seekers with state-of-the-art AI technology. Craft the perfect resume, match job descriptions, and land your dream role faster than ever.
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social Icons */}
                <a href="#" className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-lg text-base-content/90 mb-2">Product</h4>
              <Link to="/generate-resume" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Resume Builder</Link>
              <Link to="/jd-resume" className="link link-hover text-base-content/70 hover:text-primary transition-colors">JD Matcher <span className="badge badge-secondary badge-xs ml-1">New</span></Link>
              {/* <Link to="/templates" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Templates</Link>
              <Link to="/pricing" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Pricing</Link> */}
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-lg text-base-content/90 mb-2">Resources</h4>
              <Link to="/blog" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Career Blog</Link>
              <Link to="/examples" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Examples</Link>
              {/* <Link to="/faq" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Help Center</Link> */}
            </div>
            
            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-lg text-base-content/90 mb-2">Company</h4>
              <Link to="/about" className="link link-hover text-base-content/70 hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Contact</Link>
              {/* <Link to="/privacy" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Terms</Link> */}
            </div>
          </div>
          
          <div className="border-t border-base-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">© {new Date().getFullYear()} AI Resume Maker. All rights reserved.</p>
            <div className="flex gap-4 text-sm opacity-60">
              <span className="cursor-pointer hover:text-primary transition-colors">English (US)</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-primary transition-colors">USD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
