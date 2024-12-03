import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import EventsDetail from "./pages/EventsDetail.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import SearchResults from "./components/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:eventId",
    element: <EventsDetail />,
  },
  {
    path: "/addevent",
    element: <AddEvent />
  },
  {
    path: "/search-results", // Add new route for search results
    element: <SearchResults />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);