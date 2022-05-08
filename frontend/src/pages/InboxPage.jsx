import React, { useEffect, useState } from "react";
import authHeader from "../auth-header";
import { Alert, Chip, Divider, LinearProgress } from "@mui/material";
import ExchangeOffer from "../components/ExchangeOffer";
import VinylCard from "../components/VinylCard";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function InboxPage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const [offers, setOffers] = useState([]);
  const [saleOffers, setSaleOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetch(api + "/users/offers", {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setOffers(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(true);
        setLoading(false);
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetch(api + "/users/purchaseOffers", {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
      },
    }).then((response) =>
      response.json().then((d) => {
        console.log(d);
        setSaleOffers(d);
      })
    );
  }, []);

  const handleSaleAccept = (id) => {
    const newId = Number(id);
    fetch(api + `/ads/sale_ads/sell/${newId}`, {
      method: "PUT",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
        "Content-Type": "application/json",
      },
    }).then((response) => response.json().then((d) => console.log(d)));
  };

  const handleSaleReject = (id) => {
    const newId = Number(id);
    fetch(api + `/ads/sale_ads/decline/${newId}`, {
      method: "PUT",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
        "Content-Type": "application/json",
      },
    }).then((response) => response.json().then((d) => console.log(d)));
  };

  return (
    <div style={{ marginLeft: "1rem", marginTop: "2rem", width: "100%" }}>
      {loading ? (
        <LinearProgress style={{ marginTop: "1rem" }} />
      ) : (
        <>
          {errorMessage ? (
            <Alert variant="outlined" severity="error">
              Error occurred while communicating with the server.
            </Alert>
          ) : (
            <>
              {offers.length == 0 ? (
                <Alert
                  style={{ flexGrow: 1 }}
                  variant="outlined"
                  severity="info"
                >
                  No Exchange Offers.
                </Alert>
              ) : (
                offers.map((o) => (
                  <ExchangeOffer sender={o.senderUsername} offer={o.offer} />
                ))
              )}
            </>
          )}
        </>
      )}
      <div>
        <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
        {saleOffers.length == 0 ? (
          <Alert style={{ flexGrow: 1 }} variant="outlined" severity="info">
            No Sale Offers.
          </Alert>
        ) : (
          <div
            style={{
              display: "flex",
              maxWidth: window.innerWidth * 0.68,
              overflow: "scroll",
              height: "50vw",
            }}
          >
            {saleOffers.map((s) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    margin: "1rem",
                  }}
                >
                  <h3>Offer by {s.senderUsername}</h3>
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "green" }}
                      size="small"
                      onClick={() => handleSaleAccept(s.offer.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "darkred" }}
                      size="small"
                      onClick={() => handleSaleReject(s.offer.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
                <Chip
                  icon={<AttachMoneyIcon />}
                  label={
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {s.offer.ad.price}
                    </p>
                  }
                  style={{
                    zIndex: 1000,
                    marginBottom: "-2rem",
                  }}
                  color="success"
                />
                <VinylCard vinylData={s.offer.ad.vinyl} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InboxPage;
