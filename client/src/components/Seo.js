import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Seo extends Component {
  constructor(props) {
    super(props);
    props.setTitle("Seo");
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">Seo</h4>
        <p>
          <strong>Lage Apam</strong>.
        </p>
        <p>
          <Button variant="primary" size="lg">
            Seo
          </Button>
        </p>
      </div>
    );
  }
}

export default Seo;
