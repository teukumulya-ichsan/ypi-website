import React, { Component } from 'react';

import axios from 'axios';
import ReactSwal from '../../shared/Swall';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import '../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss';
import moment from 'moment';
const { SearchBar } = Search;
class CommentBerita extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    this.getComment();
  }

  getComment = () => {
    axios.get('http://localhost:4001/comments-berita').then(res => {
      this.setState({
        comments: res.data.data
      });
    });
  };

  deleteAlert = id => {
    ReactSwal.fire({
      title: 'Anda Yakin?',
      text: 'Anda tidak dapat mengembalikan data Comment tersebut!',
      type: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan!'
    }).then(async result => {
      if (result.value) {
        const { status } = await axios.delete(
          `http://localhost:4001/comments-berita/${id}`
        );

        if (status === 200) {
          await this.getComment();
          ReactSwal.fire('Deleted!', 'Comment Berhasil dihapus.', 'success');
        } else {
          ReactSwal.fire('Failed!', 'Comment Gagal dihapus.', 'error');
        }
      } else {
        ReactSwal.fire('Cancelled', 'Comment Batal dihapus :)', 'error');
      }
    });
  };

  render() {
    const isIE10Mode = document['documentMode'] === 10;
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
        text: 'Id User',
        dataField: 'id_user',
        editable: false,
        headerAlign: 'center',
        align: 'center'
      },
      {
        text: 'Id Berita',
        dataField: 'id_berita',
        editable: false,
        headerAlign: 'center',
        align: 'center'
      },
      {
        text: 'Komentar',
        dataField: 'komentar',
        editable: false
      },

      {
        text: 'Create Date',
        dataField: 'create_date',
        formatter: dateFormatter,
        classes: 'text-nowrap'
      },
      {
        text: 'Status',
        dataField: 'status'
      },
      {
        isDummyField: true,
        text: '',
        dataField: 'actions',
        classes: 'text-center text-nowrap',
        editable: false,
        formatter: (cell, row) => (
          <React.Fragment>
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
            <span className="ion ion-md-bookmarks"></span> Comments Berita
          </div>
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
              data={this.state.comments}
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

export default CommentBerita;
