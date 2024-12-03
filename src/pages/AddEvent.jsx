import Header from "../components/Header";
import { useState } from "react";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    description: "",
    image: "",
    hostedBy: "",
    details: "",
    dressCode: "",
    ageRestrictions: "",
    tags: "",
    location: "",
    ticketPrice: "",
    startDateTime: "",
    endDateTime: "",
    speakers: [{ name: "", title: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index][field] = value;
    setFormData((prev) => ({ ...prev, speakers: updatedSpeakers }));
  };

  const handleAddSpeaker = () => {
    setFormData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, { name: "", title: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      image: formData.image,
      eventDetail: {
        hostedBy: formData.hostedBy,
        details: formData.details,
        additionalInformation: {
          dressCode: formData.dressCode || "Not Specified",
          ageRestrictions: formData.ageRestrictions || "None",
        },
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        location: formData.location,
        ticketPrice: parseFloat(formData.ticketPrice) || 0,
        dateTime: {
          start: formData.startDateTime,
          end: formData.endDateTime,
        },
        speakers: formData.speakers.filter(
          (speaker) => speaker.name && speaker.title
        ),
      },
    };

    try {
      const response = await fetch(
        "https://meetup-app-backend-eight.vercel.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const responseBody = await response.json();
      alert(responseBody.message);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add the event.");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Header />
      <main className="container pb-5">
        <h1>Add Events</h1>
        <form onSubmit={handleSubmit} className="container mt-4">
          <hr />
          <h4>Event Form</h4>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Hosted By</label>
            <input
              type="text"
              className="form-control"
              name="hostedBy"
              value={formData.hostedBy}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Details</label>
            <textarea
              className="form-control"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dress Code</label>
            <input
              type="text"
              className="form-control"
              name="dressCode"
              value={formData.dressCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age Restrictions</label>
            <input
              type="text"
              className="form-control"
              name="ageRestrictions"
              value={formData.ageRestrictions}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ticket Price</label>
            <input
              type="number"
              className="form-control"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleInputChange}
            />
          </div>
          <h5>Speakers</h5>
          {formData.speakers.map((speaker, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">Speaker Name</label>
              <input
                type="text"
                className="form-control"
                value={speaker.name}
                onChange={(e) =>
                  handleSpeakerChange(index, "name", e.target.value)
                }
                required
              />
              <label className="form-label mt-2">Speaker Title</label>
              <input
                type="text"
                className="form-control"
                value={speaker.title}
                onChange={(e) =>
                  handleSpeakerChange(index, "title", e.target.value)
                }
                required
              />
            </div>
          ))}
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddSpeaker}
            >
              Add Speaker
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}