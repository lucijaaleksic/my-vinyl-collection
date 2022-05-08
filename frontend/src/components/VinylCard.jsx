import React, { useState } from "react";

import { Card } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import VinylComponent from "./VinylComponent";
import { getRandomColor, IsMobile } from "../util/utils";
import authHeader from "../auth-header";

function VinylCard({ vinylData, favVinyls, updateFunction, hasHeart }) {
  const api = process.env.REACT_APP_API_URL;

  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;
  const [color, setColor] = useState(getRandomColor());

  const cardStyle = {
    background: color,
    width: cardDimension,
    minHeight: cardDimension,
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    justifySelf: "center",
  };
  const saleHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: "-1rem",
    position: "absolute",
    top: "1.3rem",
  };

  const wrapperStyle = {
    width: cardDimension,
    height: cardDimension,
    margin: "1rem",
  };

  const toggleFavourite = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    };
    fetch(api + `/users/favourites/${vinylData.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        if (favVinyls.map((v) => v.id).includes(vinylData.id)) {
          let array = [...favVinyls];
          array.splice(
            array.findIndex((e) => e.id == vinylData.id),
            1
          );
          updateFunction(array);
        } else {
          let array = [...favVinyls];
          array.push(vinylData);
          updateFunction(array);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={wrapperStyle}>
      <Card style={cardStyle}>
        {hasHeart &&
        <div style={saleHeaderStyle}>
          {favVinyls.map((v) => v.id).includes(vinylData.id) ? (
            <FavoriteIcon onClick={toggleFavourite} />
          ) : (
            <FavoriteBorderIcon onClick={toggleFavourite} />
          )}
        </div>}

        <VinylComponent
          size={vinylDimension}
          name={vinylData.album}
          id={vinylData.id}
        />
      </Card>
    </div>
  );
}

export default VinylCard;
