import React, { Component } from 'react';
import { Card, Row, Col, Nav, ListGroup, Button, Form } from 'react-bootstrap';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    props.setTitle('Account Setting');

    this.state = {
      curTab: 'general'
    };
  }
  onFileChange(e) {
    if (e.target.files.length) {
      this.setState({ mainFileSelect: e.target.files[0] });
    } else {
      this.setState({ mainFileSelect: null });
    }
  }
  prevent(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">Account Setting</h4>

        <Card>
          <Row noGutters className="row-bordered row-border-light">
            <Col md={3} className="pt-0">
              <Nav
                className="account-settings-links list-groups list-group-flush"
                onSelect={curTab => this.setState({ curTab })}
                activeKey={this.state.curTab}
              >
                <Nav.Link
                  as={ListGroup.Item}
                  eventKey="general"
                  className="list-group-item-action cursor-pointer"
                >
                  General
                </Nav.Link>
                <Nav.Link
                  as={ListGroup.Item}
                  eventKey="password"
                  className="list-group-item-action cursor-pointer"
                >
                  Password
                </Nav.Link>
              </Nav>
            </Col>

            {this.state.curTab === 'general' && (
              <Col md={9}>
                <Card.Body className="media align-item-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
                    alt="Profile"
                    className="d-block ui-w-80"
                  />

                  <div className="media-body ml-4">
                    <Button
                      variant="outline-primary"
                      onChange={this.onFileChange}
                    >
                      Upload new photo
                    </Button>{' '}
                    &nbsp;
                    <Button variant="default md-btn-flat">Reset</Button>
                    <div className="text-light small mt-1">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </div>
                  </div>
                </Card.Body>
                <hr className="border-light m-0" />

                <Card.Body>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value="Mulia Ichsan" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value="ichsan.mulya@outlook.com" />
                  </Form.Group>

                  <hr className="border-light m-2" />

                  <Form.Group>
                    <Form.Label>Mobile Phone</Form.Label>
                    <Form.Control value="+6281260107091" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control value="Admin" disabled />
                  </Form.Group>
                </Card.Body>
              </Col>
            )}

            {this.state.curTab === 'password' && (
              <Col md={9}>
                <Card.Body className="pb-2">
                  <Form.Group>
                    <Form.Label>Current password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Repeat new password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>
                </Card.Body>
              </Col>
            )}
          </Row>
        </Card>
      </div>
    );
  }
}

export default AccountSettings;
