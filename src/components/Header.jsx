import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";


export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("https://meetup-app-backend-eight.vercel.app/events")


  const handleSearch = (e) => {
    e.preventDefault();

    const normalizedSearch = searchTerm.toLowerCase();

    const filteredEvents = data.filter(
      (event) =>
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.eventDetail.tags.some(
          (tag) =>
            tag.toLowerCase().includes(normalizedSearch) ||
            event.type.toLowerCase().includes(normalizedSearch)
        )
    );

    navigate("/search-results", {
      state: {
        searchResults: filteredEvents,
        searchTerm: searchTerm,
      },
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="https://cdn.worldvectorlogo.com/logos/meetup-1.svg"
              alt="Bootstrap"
              width="120"
              height="96"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/addevent"
                >
                  Add Event
                </Link>
              </li> */}
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  About Developer
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search events, tags, or type (Online/Offline)"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
