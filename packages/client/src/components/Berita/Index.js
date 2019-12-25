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
import axios from 'axios';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss';
import ReactSwal from '../../shared/Swall';
import moment from 'moment';

const { SearchBar } = Search;

class Berita extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getBerita();
  }

  getBerita = () => {
    axios.get('http://localhost:4001/berita').then(res => {
      console.log(res.data);
      this.setState({
        data: res.data.data
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
          `http://localhost:4001/berita/${id}`
        );

        if (status === 200) {
          await this.getBerita();
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
        text: 'Judul',
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
        text: 'Ringkasan',
        dataField: 'ringkasan',
        editable: false
      },

      {
        text: 'Created at',
        dataField: 'create_date',
        sort: true,
        editable: false,
        classes: 'text-nowrap',
        formatter: dateFormatter
      },

      {
        text: 'Category',
        dataField: 'category.category_name',
        sort: true,
        editable: false,
        formatter: cell => {
          const random = Math.floor(Math.random() * 10);
          const color = random <= 4 ? 'danger' : 'info';

          return (
            <Badge pill variant={color}>
              {cell}
            </Badge>
          );
        }
      },

      {
        text: 'Status',
        dataField: 'status',
        sort: true,
        editable: false,
        formatter: (cell, row) => {
          switch (row.status) {
            case 'ACTIVE':
              return <Badge variant="outline-success">ACTIVE</Badge>;
            case 'INACTIVE':
              return <Badge variant="outline-info">INACTIVE</Badge>;

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
              <Link to={`/berita/form/${row.id}`}>
                <Button variant="default btn-xs icon-btn md-btn-flat">
                  <i className="ion ion-md-create"></i>
                </Button>
              </Link>
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

    const expandRow = {
      parentClassName: 'primary',
      renderer: data => (
        <div>
          <Row>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  // src={`http://localhost:3000/assets/images/berita/${data.photo_url}`}
                  src={`${process.env.PUBLIC_URL}/img/berita/${data.photo_url}`}
                  alt=""
                />
                <Card.Body>
                  <Card.Title as="h4">
                    Author : {data.create_user.author_name}
                  </Card.Title>

                  <Card.Text className="small text-muted">
                    Terakhir di update pada tanggal{' '}
                    {moment(data.edit_date).format('D MMMM YYYY, H:mm')}
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
                  Dibuat pada tanggal{' '}
                  {moment(data.create_date).format('D MMMM YYYY, H:mm')}
                </Card.Header>
                <Card.Body bg="white">
                  <Card.Title as="h4">
                    Kategori : {data.category.category_name}
                  </Card.Title>
                  <Card.Text>{data.konten} </Card.Text>
                  {/* <Card.Text>
                    dangerouslySetInnerHTML={{ __html: data.konten }}
                  </Card.Text> */}
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
            <span className="ion ion-md-bookmarks"></span> Berita
          </div>
          <Link to="/berita/form">
            <Button variant="primary rounded-pill" className="d-block">
              <span className="ion ion-md-add"></span>&nbsp; Buat Berita
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
              data={this.state.data}
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

export default Berita;
