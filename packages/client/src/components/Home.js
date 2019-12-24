import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    props.setTitle('Home');
  }

  render() {
    return (
      <div>
        <Media
          as="h4"
          className="align-items-center font-weight-bold py-3 mb-4"
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
            alt="User"
            className="ui-w-50 rounded-circle"
          />
          <Media.Body className="ml-3">
            Welcome back, Teuku Mulia Ichsan!
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">
                Today is Tuesday, 8 February 2018
              </small>
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default Home;
