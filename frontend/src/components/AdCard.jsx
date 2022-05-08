import React, { useEffect, useState } from "react";

import {
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";

import FaceIcon from "@mui/icons-material/Face";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ClearIcon from "@mui/icons-material/Clear";

import { getCurrentUser, getRandomColor, IsMobile } from "../util/utils";
import AdComponent from "./AdComponent";
import authHeader from "../auth-header";
import VinylComponent from "./VinylComponent";
import Button from "@mui/material/Button";

function AdCard({
  username,
  price,
  name,
  isSale,
  id,
  removeAd,
  ad,
  fromHomepage,
}) {
  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;

  const [color, setColor] = useState(getRandomColor());
  const [exchangeModal, setExchangeModal] = useState(false);
  const [saleModal, setSaleModal] = useState(false);

  const myUsername = getCurrentUser();

  React.useEffect(() => console.log(ad), []);

  const wrapperStyle = {
    width: cardDimension,
    height: cardDimension,
    margin: "1rem",
  };
  const cardStyle = {
    background: color,
    width: cardDimension,
    minHeight: cardDimension,
    height: "15rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    justifySelf: "center",
  };
  const saleHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  };

  return (
    <div style={wrapperStyle}>
      <ExchangeOfferDialog
        open={exchangeModal}
        setOpen={setExchangeModal}
        adId={ad.id}
      />
      <SaleOfferDialog open={saleModal} setOpen={setSaleModal} adId={ad.id} />
      <Card style={cardStyle}>
        <div style={saleHeaderStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            {isSale ? (
              <Chip
                icon={<AttachMoneyIcon />}
                onClick={() => setSaleModal(true)}
                label={
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {price}
                  </p>
                }
                color="success"
              />
            ) : (
              <Tooltip title="Exchange">
                <ChangeCircleIcon
                  onClick={() => {if(username !== getCurrentUser()) setExchangeModal(true)}}
                  style={{
                    color: "white",
                    border: "5px dodgerblue solid",
                    borderRadius: 100,
                  }}
                />
              </Tooltip>
            )}
            {myUsername === username && (
              <ClearIcon
                onClick={() => removeAd(id)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        {fromHomepage ? (
          <AdComponent id={id} size={vinylDimension} name={name} />
        ) : (
          <AdComponent
            id={ad && ad.vinyl.id}
            size={vinylDimension}
            name={name}
          />
        )}

        <div style={saleHeaderStyle}>
          <Chip
            icon={<FaceIcon style={{ color: "black" }} />}
            label={
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "black",
                }}
              >
                {username}
              </p>
            }
          />
        </div>
      </Card>
    </div>
  );
}

function ExchangeOfferDialog({ open, setOpen, adId }) {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const [vinyls, setVinyls] = useState([]);
  const [vinyl, setVinyl] = useState({});

  useEffect(() => {
    fetch(api + "/vinyls/collection/ad", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((data) => setVinyls(data)));
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVinyl(value);
  };

  const askForExchange = () => {
    fetch(api + `/ads/exchange_ads/${adId}/offer/${vinyl.id}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Make an exchange offer</DialogTitle>
        <DialogContent>
          {vinyls ? (
            <FormControl fullWidth>
              <Select value={vinyl} onChange={handleChange}>
                {vinyls.map((v) => (
                  <MenuItem style={{ height: "3rem" }} value={v}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <VinylComponent size={20} />
                      <p style={{ marginLeft: "10px" }}>{v.album}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              <Button
                style={{ marginTop: "1rem" }}
                variant="contained"
                onClick={askForExchange}
              >
                OFFER
              </Button>
            </FormControl>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SaleOfferDialog({ open, setOpen, adId }) {
  const api = process.env.REACT_APP_API_URL;

  function handlePurchase() {
    fetch(api + `/ads/sale_ads/${adId}/offer/`, {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((d) => console.log(d)));
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Offer to buy this vinyl?</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "15vw",
          }}
        >
          <Button variant="contained" onClick={handlePurchase}>
            OK
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdCard;
