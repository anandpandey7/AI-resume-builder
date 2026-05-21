import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <- change this
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import InterviewPrep from "./pages/InterviewPrep";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import JdResume from "./pages/JdResume";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <Toaster />
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