import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Config extends Component {
  constructor(props) {
    super(props);
    props.setTitle("Config");
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">Config</h4>
        <p>
          <strong>Lage Apam</strong>.
        </p>
        <p>
          <Button variant="primary" size="lg">
            Config
          </Button>
        </p>
      </div>
    );
  }
}

export default Config;
