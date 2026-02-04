import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home/Home";
import Individuals from "./pages/Individuals/Individuals";
import About from "./pages/About/About";
import Corporates from "./pages/Corporates/Corporates";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import MultiStepTest from "./pages/MultiStepTest/MultiStepTest";
import "./i18n";
import JoinUs from "./pages/JoinUs/JoinUs";
import PartnerForm from "./pages/PartnerForm/PartnerForm";
import Results from "./pages/Results/Results";
import ContactForm from "./pages/ContactForm/ContactForm";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/individuals", element: <Individuals /> },
  { path: "/corporates", element: <Corporates /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/contactb2b", element: <ContactForm /> },
  { path: "/tests/personal-capacity", element: <MultiStepTest /> },
  { path: "/tests/metabolic-health", element: <MultiStepTest /> },
  { path: "/results", element: <Results></Results> },
  { path: "/joinus", element: <JoinUs /> },
  { path: "/partnerform", element: <PartnerForm /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
