import React from "react";
import styles from "./styles";

const TokenImage = ({
  url,
  price = null,
  message = "",
  hidePrice = false,
  name = "",
  rarity
}) => {
  let shownPrice;
  if (price) {
    shownPrice = price + " ETH";
  }
  if (price && price.toString().length > 10) {
    shownPrice = price.toFixed(3) + " ETH";
  }
  if (!price) {
    shownPrice = "? ETH";
  }

  return (
    <div style={styles.tokenBorder}>
      <div style={styles.tokenPrice}>
        {rarity ? <div style={styles.tokenRarity}>{rarity}</div> : null}
        {!hidePrice ? shownPrice : ""}
      </div>
      {url ? (
        <div>
          <img className="img-responsive" style={styles.tokenImage} src={url} />
          <span style={styles.tokenName}>{name}</span>
        </div>
      ) : (
        <div style={styles.message}>{message}</div>
      )}
    </div>
  );
};

export default TokenImage;
