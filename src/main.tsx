import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, useLocation } from "react-router-dom";
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



// 1. Créer un composant Layout qui inclut le ScrollRestoration
// Copie et remplace cette partie dans ton main.tsx
const RootLayout = () => {
  const { pathname } = useLocation(); // Tu dois importer useLocation de react-router-dom

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // <--- C'est ça qui enlève l'effet de scroll
    });
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // On utilise le layout ici
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
      { path: "/method", element: <Method /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
);