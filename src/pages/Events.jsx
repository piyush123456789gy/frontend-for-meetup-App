import { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

export default function Events() {
  const [modeFilter, setModeFilter] = useState("Select Event Type");
  const { data, loading, error } = useFetch(
    "https://meetup-app-backend-eight.vercel.app/events"
  );

  const filteredMode =
    modeFilter === "Select Event Type"
      ? data
      : data.filter((event) => event.type === modeFilter);

  if (loading) {
    return (
      <div className="bg-light min-vh-100">
        <Header />
        <main className="container">
          <hr />
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light min-vh-100">
        <Header />
        <main className="container">
          <hr />
          <h2>Failed to load event details</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Header />
      <main className="container pb-5">
        <div className="row mt-2">
          <div className="col-md-4">
            <h1>Meetup Events</h1>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-2">
            <select
              className="form-select"
              onChange={(e) => setModeFilter(e.target.value)}
            >
              <option value="Select Event Type">Select Event Type</option>
              <option value="Online Event">Online</option>
              <option value="Offline Event">Offline</option>
            </select>
          </div>
        </div>
        <hr />

        <div className="row">
          {filteredMode?.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <Link className="text-decoration-none" to={`/${event._id}`}>
                <div className="card h-100">
                  <img src={event.image} className="card-img-top" alt="..." />
                  <span
                    className="position-absolute top-0 start-0 m-2 p-2 badge bg-white text-dark"
                    style={{ fontSize: "0.8rem", padding: "0.4em 0.6em" }}
                  >
                    {event.type}
                  </span>
                  <div className="card-body">
                    <p className="card-text small text-muted">
                      {event.date} {event.time}
                    </p>
                    <h5 className="card-title">{event.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}