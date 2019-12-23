import React, { Component } from "react";
import { Button } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    props.setTitle("User");
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">User</h4>
        <p>
          <strong>Lage Apam</strong>
        </p>
        <p>
          <Button variant="primary" size="lg">
            User
          </Button>
        </p>
      </div>
    );
  }
}

export default User;
