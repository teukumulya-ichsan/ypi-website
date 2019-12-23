import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Tag extends Component {
  constructor(props) {
    super(props);
    props.setTitle("Tags");
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">Tags</h4>
        <p>
          <strong>Lage Tags</strong>.
        </p>
        <p>
          <Button variant="primary" size="lg">
            Tags
          </Button>
        </p>
      </div>
    );
  }
}

export default Tag;
