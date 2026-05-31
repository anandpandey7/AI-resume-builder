import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <- change this
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from './store/store';

const Root = lazy(() => import("./pages/Root"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep"));
const Contact = lazy(() => import("./pages/Contact"));
const GenerateResume = lazy(() => import("./pages/GenerateResume"));
const Signup = lazy(() => import("./pages/Signup").then(module => ({ default: module.Signup })));
const Signin = lazy(() => import("./pages/Signin").then(module => ({ default: module.Signin })));
const JdResume = lazy(() => import("./pages/JdResume"));
const Profile = lazy(() => import("./pages/Profile"));

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <Toaster />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />        {/* / */}
              <Route path="" element={<Home />} />  {/* /home */}
              <Route path="about" element={<About />} />{/* /about */}
              <Route path="interview-prep" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
              <Route path="contact" element={<Contact />} />{/* /contact */}
              <Route path="generate-resume" element={<GenerateResume />} />{/* /genrate-resume */}
              <Route path="signup" element= {<Signup/>} />
              <Route path="signin" element= {<Signin/>} />
              <Route path="jd-resume" element={<ProtectedRoute><JdResume/></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);



// React
//  │
//  ├── React Router → Page navigation
//  ├── Axios → API requests
//  ├── React Hook Form → Forms
//  ├── React Hot Toast → Notifications
//  ├── React Icons → Icons
//  │
//  ├── Tailwind CSS → Styling
//  │
//  ├── HTML to Image → Export UI as image
//  ├── React to PDF → Export UI as PDF
//  ├── React to Print → Print UI
//  │
//  └── TSParticles → Animated backgrounds