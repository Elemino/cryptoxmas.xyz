import React from "react";

const PoweredByVolca = () => {
  return (
    <div
      style={{
        display: "block",
        backgroundColor: "#474D5B",
        paddingBottom: 30,
        marginTop: 20,
        width: "100%"
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <a href="https://volca.tech" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "inline",
              fontSize: 18,
              fontFamily: "Inter UI Medium",
              color: "#979797"
            }}
          >
            Powered by{" "}
          </div>
          <div
            style={{
              display: "inline",
              fontSize: 18,
              fontFamily: "Inter UI Bold",
              color: "#4CD964"
            }}
          >
            Volcà
          </div>
        </a>
      </div>
    </div>
  );
};

export default PoweredByVolca;
