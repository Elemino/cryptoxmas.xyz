import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { buyGift } from "../../actions/transfer";
import cryptoxmasService from "./../../services/cryptoxmasService";
import PopUp from "./../common/HomeScreenPopUp";
import styles from "./styles";

class HomeScreen extends Component {
  state = {
    popUpShown: false
  };

  _renderCard(card, position) {
    const { cardId, metadata, price } = card;
    return (
      <a style={{ display: "block" }} href={`/#/send/${cardId}`} key={cardId}>
        <div
          style={{
            ...styles.nftContainer,
            float: position
          }}
        >
          <span style={styles.nftPrice}>{price} ETH</span>
          <img style={styles.nftImage} src={metadata.image} />
          <div style={styles.nftName}>{metadata.name}</div>
        </div>
      </a>
    );
  }

  render() {
    const cards = cryptoxmasService.getCardsForSale();
    const column1 = cards.filter((card, index) => index % 2 === 0);
    const column2 = cards.filter((card, index) => index % 2 !== 0);
    return (
      <Col xs={12} style={{ paddingBottom: 30 }}>
        <Row>
          <div
            style={{
              height: window.innerHeight,
              ...styles.homescreenContainer
            }}
          >
            {this.state.popUpShown ? (
              <PopUp handleClick={() => this.setState({ popUpShown: false })} />
            ) : (
              ""
            )}
            <div style={styles.homescreenTextContainer}>
              <div style={styles.homescreenGreenTitle}>
                Surprise your friend
                <br />
                with a Nifty & send
                <br />
                some Ether to charity
              </div>
              <div style={styles.homescreenGreyText}>
                *receiver
                <span
                  className="hover"
                  onClick={() => this.setState({ popUpShown: true })}
                  style={{ textDecoration: "underline", marginLeft: 4 }}
                >
                  gets guided to <br /> claiming nft&eth in wallet
                </span>
              </div>
              <div style={styles.homescreenWhiteTitle}>
                First, choose a Nifty
              </div>
            </div>
            <Col xs={6} sm={6} lg={6} style={styles.nftLeftColumn}>
              <div>{column1.map(card => this._renderCard(card, "right"))}</div>
            </Col>
            <Col xs={6} sm={6} lg={6} style={styles.nftRightColumn}>
              <div>{column2.map(card => this._renderCard(card, "left"))}</div>
            </Col>
          </div>
        </Row>
      </Col>
    );
  }
}

export default connect(
  state => ({
    networkId: state.web3Data.networkId,
    balanceUnformatted: state.web3Data.balance
  }),
  { buyGift }
)(HomeScreen);
