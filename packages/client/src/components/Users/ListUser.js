import React, { Component } from 'react';
import {
  Card,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  Media,
  Modal
} from 'react-bootstrap';
import axios from 'axios';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss';
import ReactSwal from '../../shared/Swall';
const { SearchBar } = Search;

class ListUser extends Component {
  state = {
    user: [],
    formUser: {},
    formEditUser: {},
    edit: false,
    redirect: false,
    modalShow: false
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get('http://localhost:4001/users').then(res => {
      this.setState({
        user: res.data.data
      });
    });
  };

  handleSubmit = async () => {
    const { formUser, formEditUser, edit } = this.state;
    let sendData = {};

    if (!edit) {
      console.log(formUser);
      sendData = await axios.post('http://localhost:4001/users', {
        ...formUser
      });
    } else {
      console.log(formEditUser);
      sendData = await axios.put(
        `http://localhost:4001/users/${formUser.user_id}`,
        {
          ...formEditUser
        }
      );
      // console.log(sendData);
    }
    
    if (sendData.status === 200) {
      this.setState({
        modalShow: false
      });
      await this.getUser();
    }
  };

  handleModal = async (id = '') => {
    if (id !== '') {
      const { data } = await axios.get(`http://localhost:4001/users/${id}`); // katuleh link api jih

      console.log(data.data.status, data.data.data);
      if (data.data.status === 200) {
        // console.log('sukses'); //save
        await this.setState({
          formUser: data.data.data,
          edit: true
        });
      }
    }
    this.setState({ modalShow: true });
  };

  closeForm = () => {
    this.setState({ modalShow: false, formUser: '' });
  };

  deleteAlert = id => {
    ReactSwal.fire({
      title: 'Anda Yakin?',
      text: 'Anda tidak dapat mengembalikan data User tersebut!',
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan!'
    }).then(async result => {
      if (result.value) {
        const { status } = await axios.delete(
          `http://localhost:4001/users/${id}`
        );

        if (status === 200) {
          await this.getUser();
          ReactSwal.fire('Deleted!', 'User Berhasil dihapus.', 'success');
        } else {
          ReactSwal.fire('Failed!', 'User gagal dihapus.', 'error');
        }
      } else {
        ReactSwal.fire('Cancelled', 'User Batal dihapus :)', 'error');
      }
    });
  };

  onValueChange = ({ target }) => {
    this.setState({
      formUser: {
        ...this.state.formUser,
        [target.name]: target.value
      }
    });

    if (this.state.edit) {
      this.setState({
        formEditUser: {
          ...this.state.formEditUser,
          [target.name]: target.value
        }
      });
    }
  };

  render() {
    const isIE10Mode = document['documentMode'] === 10;
    const { formUser } = this.state;

    const columns = [
      {
        text: 'ID',
        dataField: 'user_id',
        headerAlign: 'center',
        align: 'center',
        sort: true
      },
      {
        text: 'Nama',
        dataField: 'name'
      },
      {
        text: 'E-Mail',
        dataField: 'email'
      },
      {
        text: 'Dibuat oleh',
        dataField: 'create_user'
      },
      {
        text: 'Dibuat Pada',
        dataField: 'create_date'
      },
      {
        text: 'Status',
        dataField: 'status'
      },
      {
        text: 'Login Terakhir',
        dataField: 'last_login',
        sort: true,
        editable: false,
        classes: 'text-nowrap'
      },

      {
        isDummyField: true,
        text: '',
        dataField: 'actions',
        classes: 'text-center text-nowrap',
        editable: false,
        formatter: (cell, row) => (
          <React.Fragment>
            <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
              <Button
                onClick={() => this.handleModal(row.user_id)}
                variant="default btn-xs icon-btn md-btn-flat"
              >
                <i className="ion ion-md-create"></i>
              </Button>
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
              <Button
                onClick={() => this.deleteAlert(row.user_id)}
                variant="default btn-xs icon-btn md-btn-flat"
              >
                <i className="ion ion-md-close"></i>
              </Button>
            </OverlayTrigger>
          </React.Fragment>
        )
      }
    ];
    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
          <div>
            <span className="ion ion-md-contact"></span> User Management
          </div>

          <Button
            onClick={() => this.handleModal()}
            variant="primary rounded-pill"
            className="d-block"
          >
            <span className="ion ion-md-add"></span>&nbsp; Tambah User
          </Button>

          <Modal show={this.state.modalShow} size="lg" onHide={this.closeForm}>
            <Modal.Header closeButton>
              <Modal.Title as="h5">
                Tambah <span className="font-weight-light">User</span>
                <br />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Media className="align-item--center mb-4">
                <img
                  src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
                  alt="Author"
                  className="d-block ui-w-80"
                />
                <Media.Body className="ml-3">
                  <Form.Label className="d-block mb-2">Avatar User</Form.Label>
                  <Button variant="outline-primary" size="sm">
                    Change
                  </Button>
                  &nbsp;
                  <Button variant="default md-btn-flat" size="sm">
                    Reset
                  </Button>
                </Media.Body>
              </Media>

              <hr className="border-light m-0 mb-3" />

              <Form.Group>
                <Form.Label>Nama User</Form.Label>

                <Form.Control
                  placeholder="Masukkan Nama"
                  className="mb-1"
                  onChange={e => this.onValueChange(e)}
                  name="name"
                  value={formUser.name}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email User</Form.Label>

                <Form.Control
                  placeholder="Masukkan Email"
                  className="mb-1"
                  onChange={e => this.onValueChange(e)}
                  name="email"
                  value={formUser.email}
                />
              </Form.Group>

              <hr className="border-light m-0" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => this.closeForm()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => this.handleSubmit()}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </h4>

        {isIE10Mode && (
          <div className="alert alert-danger">
            <strong>react-bootstrap-table2</strong> tidak support pada Internet
            Explorer
          </div>
        )}
        {!isIE10Mode && (
          <Card>
            <ToolkitProvider
              keyField="id"
              data={this.state.user}
              columns={columns}
              bootstrap4
              search
            >
              {props => (
                <React.Fragment>
                  <Card.Body className="d-flex justify-content-end pb-0">
                    <div style={{ maxWidth: '300px' }}>
                      <SearchBar {...props.searchProps} />
                    </div>
                  </Card.Body>

                  <BootstrapTable
                    {...props.baseProps}
                    wrapperClasses="table-responsive react-bs-table-card"
                    classes="card-table border-top mt-2"
                    cellEdit={cellEditFactory({
                      mode: 'click',
                      blurToSave: true
                    })}
                    pagination={paginationFactory()}
                  />
                </React.Fragment>
              )}
            </ToolkitProvider>
          </Card>
        )}
      </div>
    );
  }
}

export default ListUser;
