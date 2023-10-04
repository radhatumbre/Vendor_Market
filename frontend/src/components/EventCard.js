import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [sortedByPrice, setSortedByPrice] = useState(false);
  const [sortedByRating, setSortedByRating] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    // Fetch event data from the backend API
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSortByPrice = () => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => {
      if (sortedByPrice) {
        return a.eventPrice - b.eventPrice;
      } else {
        return b.eventPrice - a.eventPrice;
      }
    });
    setEvents(sortedEvents);
    setSortedByPrice(!sortedByPrice);
  };

  const handleSortByRating = () => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => {
      if (sortedByRating) {
        return a.eventRating - b.eventRating;
      } else {
        return b.eventRating - a.eventRating;
      }
    });
    setEvents(sortedEvents);
    setSortedByRating(!sortedByRating);
  };

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="event-card-container">
      <div className="filter-bar">
        <InputGroup className="mb-3">
          <InputGroup.Text>Location</InputGroup.Text>
          <FormControl
            placeholder="Search location"
            onChange={handleLocationFilter}
            value={locationFilter}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleSortByPrice}>
          Price {sortedByPrice ? "⬆️" : "⬇️"}
        </Button>
        <Button variant="primary" onClick={handleSortByRating}>
          Rating {sortedByRating ? "⬆️" : "⬇️"}
        </Button>
      </div>
      {filteredEvents.map((event) => (
        <Card key={event._id}>
          <Card.Body>
            <Card.Title>{event.eventTitle}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            <Card.Text>Price: {event.eventPrice}</Card.Text>
            <Card.Text>Rating: {event.eventRating}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EventCard;
