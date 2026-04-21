// @ts-nocheck
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
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
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import Privacy from "./pages/Privacy/Privacy";
import Stat from "./pages/Stat/Stat";
import Method from "./pages/Method/Method";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Import your GA hook
import usePageTracking from "./hooks/usePageTracking.jsx";
import Disclaimer2 from "./pages/Disclaimer2/Disclaimer2.js";

gsap.registerPlugin(ScrollTrigger);

// ✅ Root Layout
const RootLayout = () => {
  const { pathname } = useLocation();

  // ✅ GOOGLE ANALYTICS TRACKING (THIS WAS MISSING)
  usePageTracking();

  // GSAP resize observer
  useEffect(() => {
    let timer;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

// ✅ Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/individuals", element: <Individuals /> },
      { path: "/corporates", element: <Corporates /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/contactb2b", element: <ContactForm /> },
      { path: "/tests/personal-capacity", element: <MultiStepTest /> },
      { path: "/tests/metabolic-health", element: <MultiStepTest /> },
      { path: "/results", element: <Results /> },
      { path: "/joinus", element: <JoinUs /> },
      { path: "/partnerform", element: <PartnerForm /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/stats", element: <Stat /> },
      { path: "/disclaimer/:testId", element: <Disclaimer /> },
        { path: "/disclaimer2", element: <Disclaimer2 /> },
      { path: "/method", element: <Method /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// ✅ App render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
