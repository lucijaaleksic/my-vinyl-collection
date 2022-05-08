import React from "react";
import EventIcon from "@mui/icons-material/Event";
import { Card, Chip, Grow } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ClearIcon from "@mui/icons-material/Clear";

function EventCard({ title, description, link, removeEvent, id, viewOnly }) {
  return (
    <Grow in>
      <Card
        style={{
          width: "15vw",
          height: "15vw",
          marginBottom: "1rem",
          position: "relative",
        }}
        variant="outlined"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderBottom: "1px solid black",
            background: "#d59a88",
            width: "100%",
          }}
        >
          <h2
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              position: "relative",
            }}
          >
            <EventIcon style={{ fontSize: "2rem", marginInline: "0.5rem" }} />
            {title}
            {!viewOnly && (
              <ClearIcon
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: -10,
                  right: 10,
                }}
                onClick={() => removeEvent(id)}
              />
            )}
          </h2>
        </div>
        <p style={{ margin: "10px", marginTop: "5rem" }}>{description}</p>
        <Chip
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            cursor: "pointer",
          }}
          icon={<LinkIcon />}
          label="Link"
          onClick={() => window.open(link).focus()}
        />
      </Card>
    </Grow>
  );
}

export default EventCard;
