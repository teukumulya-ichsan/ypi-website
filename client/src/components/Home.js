import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    props.setTitle("Home");
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          Yayasan Pesantren Islam Al-Azhar
        </h4>
        <p>
          <strong>Lage Apam</strong>.
        </p>
        <p>
          <Button variant="primary" size="lg">
            Home
          </Button>
        </p>
      </div>
    );
  }
}

export default Home;
