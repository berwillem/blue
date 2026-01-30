import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Individuals from "./pages/Individuals/Individuals";
import About from "./pages/About/About";
import Corporates from "./pages/Corporates/Corporates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/individuals",
    element: <Individuals />,
  },
  {
    path: "/corporates",
    element: <Corporates />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
