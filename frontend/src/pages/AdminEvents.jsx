import React from "react";
import authHeader from "../auth-header";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventCard from "../components/EventCard";

function AdminEvents() {
  const api = process.env.REACT_APP_API_URL;
  const [events, setEvents] = React.useState();
  const [open, setOpen] = React.useState(false);

  const [newTitle, setNewTitle] = React.useState();
  const [newDescription, setNewDescription] = React.useState();
  const [newLink, setNewLink] = React.useState();

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

  function postEvent() {
    fetch(api + "/event/createEvent", {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        social_network_link: newLink,
      }),
    }).then((response) =>
      response.json().then(() =>
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
        )
      )
    );
    setOpen(false);
  }

  function removeEvent(id) {
    fetch(api + `/event/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then(() =>
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
        )
      )
    );
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          justifyItems: "center",
        }}
      >
        <Card
          style={{
            width: "15vw",
            height: "15vw",
            marginBottom: "1rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          <AddIcon style={{ width: "100px", height: "100px" }} />
          <h2>Add new event</h2>
        </Card>
        {events ? (
          events.map((e) => (
            <EventCard
              title={e.title}
              description={e.description}
              link={e.social_network_link}
              removeEvent={removeEvent}
              id={e.id}
            />
          ))
        ) : (
          <p>No events</p>
        )}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              label="Title"
              style={{ marginTop: "10px" }}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              maxRows={4}
              style={{ marginTop: "10px" }}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <TextField
              label="Link"
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button variant="contained" onClick={postEvent}>
              OK
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminEvents;
