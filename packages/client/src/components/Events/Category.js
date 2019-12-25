import React, { Component } from 'react';
import {
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
  Form,
  Modal,
  Media
} from 'react-bootstrap';
import axios from 'axios';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss';
import ReactSwal from '../../shared/Swall';
import moment from 'moment';
const { SearchBar } = Search;

class CategoryEvent extends Component {
  state = {
    category: [],
    formCate: {},
    formEditCate: {},
    edit: false,
    modalShow: false
  };

  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    axios.get('http://localhost:4001/category-event').then(res => {
      // console.log(res.data);
      this.setState({
        category: res.data.data
      });
    });
  };

  handleModal = async (id = '') => {
    if (id !== '') {
      const { data } = await axios.get(
        `http://localhost:4001/category-event/${id}`
      );

      if (data.data.status === 200) {
        // console.log('OKE');
        this.setState({
          formCate: data.data.data,
          edit: true
        });
      }
    }
    this.setState({ modalShow: true });
  };

  handleSubmit = async () => {
    const { formCate, formEditCate, edit } = this.state;
    let sendData = {};

    if (!edit) {
      sendData = await axios.post('http://localhost:4001/category-event', {
        ...formCate
      });
    } else {
      sendData = await axios.put(
        `http://localhost:4001/category-event/${formCate.id}`,
        {
          ...formEditCate
        }
      );
    }

    if (sendData.status === 200) {
      this.setState({
        modalShow: false
      });
      await ReactSwal.fire('Success!', sendData.data.message, 'success');
      await this.getCategory();
    } else {
      // console.log(sendData);
      await ReactSwal.fire('Error', 'Gagal', 'error');
    }
  };

  closeForm = () => {
    this.setState({ modalShow: false, formCate: '', edit: false });
  };

  onValueChange = ({ target }) => {
    this.setState({
      formCate: {
        ...this.state.formCate,
        [target.name]: target.value
      }
    });

    if (this.state.edit) {
      this.setState({
        formEditCate: {
          ...this.state.formEditCate,
          [target.name]: target.value
        }
      });
    }
  };

  deleteAlert = id => {
    ReactSwal.fire({
      title: 'Anda Yakin?',
      text: 'Anda tidak dapat mengembalikan data Kategori tersebut!',
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan!'
    }).then(async result => {
      if (result.value) {
        const { status } = await axios.delete(
          `http://localhost:4001/category-event/${id}`
        );

        if (status === 200) {
          await this.getCategory();
          ReactSwal.fire(
            'Deleted!',
            'Data Kategori Berhasil dihapus.',
            'success'
          );
        } else {
          ReactSwal.fire('Failed!', 'Data Kategori dihapus.', 'error');
        }
      } else {
        ReactSwal.fire('Cancelled', 'Data Kategori dihapus :)', 'error');
      }
    });
  };

  render() {
    const isIE10Mode = document['documentMode'] === 10;
    const { formCate, edit } = this.state;
    function dateFormatter(cell) {
      return <span>{moment(cell).format('D MMMM YYYY, H:mm')}</span>;
    }
    const columns = [
      {
        text: 'ID',
        dataField: 'id',
        editable: false,
        headerAlign: 'center',
        align: 'center'
      },
      {
        text: 'Nama',
        dataField: 'nama'
      },
      {
        text: 'Create By',
        dataField: 'create_user.creator_name'
      },
      {
        text: 'Create At',
        dataField: 'create_date',
        formatter: dateFormatter,
        classes: 'text-nowrap'
      },
      {
        text: 'Status',
        dataField: 'status',
        sort: true,
        editable: false,
        formatter: (cell, row) => {
          switch (row.status) {
            case 'ACTIVE':
              return (
                <Badge pill variant="success">
                  ACTIVE
                </Badge>
              );
            case 'INACTIVE':
              return (
                <Badge pill variant="info">
                  INACTIVE
                </Badge>
              );

            default:
              return '';
          }
        }
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
                onClick={() => this.handleModal(row.id)}
                variant="default btn-xs icon-btn md-btn-flat"
              >
                <i className="ion ion-md-create"></i>
              </Button>
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
              <Button
                onClick={() => this.deleteAlert(row.id)}
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
            <span className="ion ion-md-bookmarks"></span> Kategori Event
          </div>
          <Button
            onClick={() => this.handleModal()}
            variant="primary rounded-pill"
            className="d-block"
          >
            <span className="ion ion-md-add"></span>&nbsp; Tambah Kategori
          </Button>

          <Modal show={this.state.modalShow} size="lg" onHide={this.closeForm}>
            <Modal.Header closeButton>
              <Modal.Title as="h5">
                {edit ? 'Update' : 'Tambah'}
                <span className="font-weight-light"> Kategori Event</span>
                <br />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Media className="align-item--center mb-4">
                <img
                  src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
                  alt="Author"
                  className="d-block ui-w-40 rounded-circle"
                />
                <Media.Body className="ml-3">
                  <a
                    href="#d"
                    onClick={this.prevent}
                    className="text-body d-block"
                  >
                    <strong>
                      {/* {this.state.articleData.author.name} */}
                      Teuku Mulia Ichsan
                    </strong>
                  </a>
                  {/* Created at {this.state.articleData.created_at} */}
                  Dibuat pada 27 November 2019
                </Media.Body>
              </Media>

              <hr className="border-light m-0 mb-3" />

              <Form.Group>
                <Form.Label>Nama Kategori</Form.Label>

                <Form.Control
                  placeholder="Masukkan Nama"
                  className="mb-1"
                  onChange={e => this.onValueChange(e)}
                  name="nama"
                  value={formCate.nama || ''}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  value={formCate.status || ''}
                  onChange={e => this.onValueChange(e)}
                  as="select"
                  className="custom-select"
                  name="status"
                >
                  <option value="">Set Status</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </Form.Control>
              </Form.Group>

              <hr className="border-light m-0" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => this.closeForm()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => this.handleSubmit()}>
                {edit ? 'Update' : 'Create'}
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
              // data untuk table di ambil dari state.data
              data={this.state.category}
              columns={columns}
              bootstrap4
              search
            >
              {props => (
                <React.Fragment>
                  {/* Search bar */}
                  <Card.Body className="d-flex justify-content-end pb-0">
                    <div style={{ maxWidth: '300px' }}>
                      <SearchBar {...props.searchProps} />
                    </div>
                  </Card.Body>

                  <BootstrapTable
                    {...props.baseProps}
                    wrapperClasses="table-responsive react-bs-table-card"
                    classes="card-table border-top mt-2"
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

export default CategoryEvent;
