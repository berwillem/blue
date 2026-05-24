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

import usePageTracking from "./hooks/usePageTracking.jsx";
import Disclaimer2 from "./pages/Disclaimer2/Disclaimer2.js";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   GLOBAL ERROR LOGGING
========================= */

// You can later replace this with an API call to your backend
const logError = (type, error, info) => {
  const payload = {
    type,
    message: error?.message || String(error),
    stack: error?.stack,
    info,
    url: window.location.href,
    time: new Date().toISOString(),
  };

  console.error("🚨 APP ERROR LOG:", payload);

  // OPTIONAL: send to backend
  // fetch("/api/client-error", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // }).catch(() => {});
};

// Global JS errors
window.addEventListener("error", (event) => {
  logError("window_error", event.error || event.message, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  logError("unhandled_promise", event.reason, null);
});

/* =========================
   ROOT LAYOUT
========================= */

const RootLayout = () => {
  const { pathname } = useLocation();

  usePageTracking();

  useEffect(() => {
    let timer;

    try {
      const resizeObserver = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            ScrollTrigger.refresh();
          } catch (err) {
            logError("scrolltrigger_refresh", err);
          }
        }, 500);
      });

      resizeObserver.observe(document.body);

      return () => {
        resizeObserver.disconnect();
        clearTimeout(timer);
      };
    } catch (err) {
      logError("resize_observer_init", err);
    }
  }, []);

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } catch (err) {
      logError("scroll_to_top", err);
    }
  }, [pathname]);

  return <Outlet />;
};

/* =========================
   ROUTER ERROR BOUNDARY
========================= */

class RouterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    logError("react_render_error", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError("react_catch_error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong.</h2>
          <p>Check console logs for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

/* =========================
   ROUTER CONFIG
========================= */

const router = createBrowserRouter(
  [
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
  ],
  { future: { v7_startTransition: true } },
);

/* =========================
   APP START
========================= */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterErrorBoundary>
      <RouterProvider router={router} />
    </RouterErrorBoundary>
  </StrictMode>,
);
