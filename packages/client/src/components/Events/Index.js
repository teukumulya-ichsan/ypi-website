import React, { Component } from 'react';
import {
  Card,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Row,
  Col
} from 'react-bootstrap';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss';
import axios from 'axios';
import ReactSwal from '../../shared/Swall';

const { SearchBar } = Search;

class Events extends Component {
  state = {
    events: []
  };

  // for every mounted this class always hit getEvent
  componentDidMount() {
    this.getEvent();
  }
  getEvent = () => {
    axios.get('http://localhost:4001/events').then(res => {
      console.log(res.data);
      this.setState({
        events: res.data.data
      });
    });
  };

  deleteAlert = id => {
    ReactSwal.fire({
      title: 'Anda Yakin?',
      text: 'Anda tidak dapat mengembalikan data berita tersebut!',
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan!'
    }).then(async result => {
      if (result.value) {
        const { status } = await axios.delete(
          `http://localhost:4001/events/${id}`
        );

        if (status === 200) {
          await this.getEvent();
          ReactSwal.fire('Deleted!', 'Berita Berhasil dihapus.', 'success');
        } else {
          ReactSwal.fire('Failed!', 'Berita gagal dihapus.', 'error');
        }
      } else {
        ReactSwal.fire('Cancelled', 'Berita Batal dihapus :)', 'error');
      }
    });
  };

  render() {
    const isIE10Mode = document['documentMode'] === 10;

    // daftar column / field yang dimasukkan ke dalam react-botstrap-table-next2
    const columns = [
      {
        text: 'ID',
        dataField: 'id',

        editable: false,
        headerAlign: 'center',
        align: 'center'
      },
      {
        text: 'Judul Event',
        dataField: 'judul',
        editor: {
          type: Type.TEXTAREA
        },
        editorStyle: {
          backgroundColor: '#D9E3F0'
        },
        headerStyle: { minWidth: '18rem' },
        formatter: (cell, row) => {
          return (
            <a href="#d" onClick={this.prevent}>
              {row.judul}
            </a>
          );
        }
      },

      {
        text: 'Event Mulai',
        dataField: 'event_mulai',
        sort: true,
        editable: false,
        classes: 'text-nowrap'
      },
      {
        text: 'Event Selesai',
        dataField: 'event_selesai',
        sort: true,
        editable: false,
        classes: 'text-nowrap'
      },
      {
        text: 'Dibuat Pada',
        dataField: 'create_date',
        sort: true,
        editable: false,
        classes: 'text-nowrap'
      },
      {
        text: 'Category',
        dataField: 'id_kategori',
        sort: true,
        editable: false,

        formatter: (cell, row) => {
          switch (row.id_kategori) {
            case 1:
              return (
                <Badge pill variant="danger">
                  Event Umum
                </Badge>
              );
            case 2:
              return (
                <Badge pill variant="info">
                  Kajian
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
            <OverlayTrigger overlay={<Tooltip>Edit Event</Tooltip>}>
              <Link to={`/events/form/${row.id}`}>
                <Button variant="default btn-xs icon-btn md-btn-flat">
                  <i className="ion ion-md-create"></i>
                </Button>
              </Link>
            </OverlayTrigger>
            &nbsp;
            <OverlayTrigger overlay={<Tooltip>Remove Event</Tooltip>}>
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

    const expandRow = {
      parentClassName: 'primary',
      renderer: events => (
        <div>
          <Row>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  // src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
                  src={events.photo_url}
                  alt="Card image cap"
                />
                <Card.Body>
                  <Card.Title as="h4">
                    Author : {events.create_user}{' '}
                  </Card.Title>

                  <Card.Text className="small text-muted">
                    Terakhir di update pada tanggal {events.edit_date}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card
                bg="primary"
                text="white"
                className="card-hover border-0 mb-3"
              >
                <Card.Header>
                  Dibuat pada tanggal {events.create_date}
                </Card.Header>
                <Card.Body bg="white">
                  <Card.Title as="h4">
                    Kategori : {events.id_kategori}{' '}
                  </Card.Title>
                  <Card.Text>{events.konten}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ),
      showExpandColumn: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return (
            <Button size="md" variant="outline-danger icon-btn borderless">
              <span className="ion ion-md-remove-circle-outline"></span>
            </Button>
          );
        }
        return (
          <Button size="md" variant="outline-info icon-btn borderless">
            <span className="ion ion-md-add-circle-outline"></span>
          </Button>
        );
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <Button size="md" variant="outline-danger icon-btn borderless">
              <span className="ion ion-ios-arrow-down"></span>
            </Button>
          );
        }
        return (
          <Button size="md" variant="outline-success icon-btn borderless">
            <span className="ion ion-ios-arrow-dropright-circle"></span>
          </Button>
        );
      },
      expandByColumnOnly: true
    };

    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
          <div>
            <span className="ion ion-md-bookmarks"></span> Events
          </div>
          <Link to="/events/form">
            <Button variant="primary rounded-pill" className="d-block">
              <span className="ion ion-md-add"></span>&nbsp; Tambah Event
            </Button>
          </Link>
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
              data={this.state.events}
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
                    cellEdit={cellEditFactory({
                      mode: 'click',
                      blurToSave: true
                    })}
                    expandRow={expandRow}
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

export default Events;
