import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { AvatarGenerator } from "random-avatar-generator";

export default function EventsDetail() {
  const { data, loading, error } = useFetch(
    "https://meetup-app-backend-eight.vercel.app/events"
  );

  const eventId = useParams();
  const clickedEvent = data?.find((event) => event._id == eventId.eventId);

  const generator = new AvatarGenerator();

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

  if (!clickedEvent) {
    return (
      <div className="bg-light min-vh-100">
        <Header />
        <main className="container">
          <hr />
          <h2>Event not found</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Header />
      <main className="container pb-5">
        <hr />
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-4">{clickedEvent.title}</h1>
            <p className="text-muted mb-2">Hosted By:</p>
            <h5 className="fw-bold">{clickedEvent.eventDetail.hostedBy}</h5>
            <img
              className="img-fluid rounded my-4 shadow-sm"
              src={clickedEvent.image}
              alt={clickedEvent.title}
            />
            <h3 className="mb-3">Details</h3>
            <p className="text-muted">{clickedEvent.eventDetail.details}</p>
            <div className="mt-4">
              <h3 className="mb-3">Additional Information</h3>
              <p className="mb-1">
                <strong>Dress Code: </strong>
                {clickedEvent.eventDetail.additionalInformation.dressCode}
              </p>
              <p>
                <strong>Age Restrictions: </strong>
                {clickedEvent.eventDetail.additionalInformation.ageRestrictions}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="mb-3">Event Tags</h3>
              <div>
                {clickedEvent.eventDetail.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="btn btn-danger me-2 mb-2 px-3"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-2"></div>

          {/* Right Section */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 mb-4">
              <div className="card-body">
                <p className="text-muted d-flex align-items-center">
                  <CalendarTodayIcon fontSize="small" className="me-2" />
                  {clickedEvent.eventDetail.dateTime.start} to{" "}
                  {clickedEvent.eventDetail.dateTime.end}
                </p>
                <p className="text-muted d-flex align-items-center">
                  <LocationOnIcon fontSize="small" className="me-2" />
                  {clickedEvent.eventDetail.location}
                </p>
                <p className="fw-bold d-flex align-items-center">
                  <AttachMoneyIcon fontSize="small" className="me-2" />
                  ₹{clickedEvent.eventDetail.ticketPrice}
                </p>
              </div>
            </div>

            <h2>Speakers ({clickedEvent.eventDetail.speakers.length})</h2>
            <div className="row g-2">
              {clickedEvent.eventDetail.speakers.map((speaker, index) => (
                <div className="col-6" key={index}>
                  <div className="card text-center shadow-sm">
                    <img
                      src={generator.generateRandomAvatar()}
                      className="card-img-top rounded-circle mt-3 mx-auto"
                      alt={speaker.name}
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div className="card-body">
                      <p className="fw-bold mb-0">{speaker.name}</p>
                      <p className="text-muted small">{speaker.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-danger w-100 mt-4">RSVP</button>
          </div>
        </div>
      </main>
    </div>
  );
}