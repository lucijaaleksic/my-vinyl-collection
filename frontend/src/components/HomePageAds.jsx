import React, { useEffect } from "react";
import AdCard from "./AdCard";

function HomePageAds({ exchangeAds, saleAds }) {
  const containerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2rem",
  };

  React.useEffect(() => {
    console.log(saleAds);
    console.log(exchangeAds);
  }, []);

  return (
    <div style={containerGridStyle}>
      {saleAds.map((ad) => (
        <AdCard
          username={ad.username}
          price={ad.saleAd.price}
          name={ad.saleAd.vinyl.album}
          isSale
          id={ad.saleAd.vinyl.id}
          ad={ad.saleAd}
          fromHomepage
        />
      ))}
      {exchangeAds.map((ad) => (
        <AdCard
          username={ad.username}
          name={ad.exchangeAd.vinyl.album}
          id={ad.exchangeAd.vinyl.id}
          ad={ad.exchangeAd}
          fromHomepage
        />
      ))}
    </div>
  );
}

export default HomePageAds;
