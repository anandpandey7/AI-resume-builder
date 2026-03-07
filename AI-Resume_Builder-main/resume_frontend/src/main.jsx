import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <- change this
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />        {/* / */}
          <Route path="" element={<Home />} />  {/* /home */}
          <Route path="about" element={<About />} />{/* /about */}
          <Route path="services" element={<Services />} />{/* /services */}
          <Route path="contact" element={<Contact />} />{/* /contact */}
          <Route path="generate-resume" element={<GenerateResume />} />{/* /genrate-resume */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
