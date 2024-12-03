import React from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";

export default function SearchResults() {
  const location = useLocation();
  const { searchResults, searchTerm } = location.state || {
    searchResults: [],
    searchTerm: "",
  };

  return (
    <>
      <Header />
      <main className="container">
        <hr />
        <h1>Search Results</h1>
        {searchResults.length === 0 ? (
          <p>No events found matching "{searchTerm}"</p>
        ) : (
          <>
            <p>Found {searchResults.length} result(s)</p>
            <div className="row">
              {searchResults.map((event) => (
                <div key={`/${event.id}`} className="col-md-4 mb-3">
                  <Link to={`/${event.id}`}>
                    <div className="card h-100">
                      <img
                        src={event.image}
                        className="card-img-top"
                        alt="..."
                      />
                      <span
                        className="position-absolute top-0 start-0 m-2 badge bg-dark text-white"
                        style={{ fontSize: "0.8rem", padding: "0.4em 0.6em" }}
                      >
                        {event.type}
                      </span>
                      <div className="card-body">
                        <p className="card-text small">
                          {event.date} {event.time}
                        </p>
                        <h5 className="card-title">{event.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
