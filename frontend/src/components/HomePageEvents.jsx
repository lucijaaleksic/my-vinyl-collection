import React from "react";
import authHeader from "../auth-header";
import EventCard from "./EventCard";

function HomePageEvents() {
  const api = process.env.REACT_APP_API_URL;

  const [events, setEvents] = React.useState();

  React.useEffect(() => {
    fetch(api + "/event", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    }).then((response) =>
      response.json().then((d) => {
        setEvents(d);
      })
    );
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        justifyItems: "center",
      }}
    >
      {events &&
        events.map((e) => (
          <EventCard
            title={e.title}
            description={e.description}
            link={e.social_network_link}
            viewOnly
            id={e.id}
          />
        ))}
    </div>
  );
}

export default HomePageEvents;
