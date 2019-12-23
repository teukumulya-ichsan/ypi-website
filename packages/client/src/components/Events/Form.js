import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import loadable from '@loadable/component';
import '../../vendor/libs/react-quill/typography.scss';
import '../../vendor/libs/react-quill/editor.scss';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../../vendor/libs/react-datepicker/react-datepicker.scss';

import ReactSwal from '../../shared/Swall';
import { Card, Form, Button, Media } from 'react-bootstrap';

// Catch error in IE10
const ReactQuill = loadable(
  () =>
    new Promise(resolve =>
      import('react-quill')
        .then(Component => resolve(Component))
        .catch(() => resolve(<div />))
    )
);

class FormEvent extends Component {
  state = {
    eventData: { konten: '' },
    eventEdit: {},
    mainFileSelect: null,
    edit: false,
    redirect: false,
    startDate: new Date(),
    endDate: moment()
      .add(5, 'days')
      .toDate()
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      const { data } = await Axios.get(`http://localhost:4001/events/${id}`);

      //   console.log(data);
      if (data.status === 200) {
        this.setState({ eventData: data.data, edit: true });
      }
    }
  };

  onValueChange = ({ target }) => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        [target.name]: target.value
      }
    });

    if (this.state.edit) {
      this.setState({
        eventEdit: {
          ...this.state.eventEdit,
          [target.name]: target.value
        }
      });
    }
  };

  handleChange = date => {
    this.setDates({ startDate: date });
  };

  setDates = ({
    startDate = this.state.startDate,
    endDate = this.state.endDate
  }) => {
    if (moment(startDate).isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({
      startDate,
      endDate
    });
  };

  onValueChangeContent = value => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        konten: value
      }
    });

    if (this.state.edit) {
      this.setState({
        eventEdit: {
          ...this.state.eventEdit,
          konten: value
        }
      });
    }
  };

  // onFileChange = e => {
  //   if (e.target.files.length) {
  //     this.setState({ mainFileSelect: e.target.files[0] });
  //   } else {
  //     this.setState({ mainFileSelect: null });
  //   }
  // };
  handleSubmit = async status => {
    const { eventData, edit, eventEdit } = this.state;
    let sendData = {};
    if (!edit) {
      sendData = await Axios.post('http://localhost:4001/events', {
        ...eventData,
        status
      });
    } else {
      sendData = await Axios.put(
        `http://localhost:4001/events/${eventData.id}`,
        {
          ...eventEdit,
          status
        }
      );
    }

    if (sendData.status === 200) {
      await ReactSwal.fire('Berhasil!', sendData.data.data.message, 'success');
      this.setState({ redirect: true });
    } else {
      await ReactSwal.fire(
        'Error',
        sendData.data.data.error.error_code.message.message,
        'error'
      );
      this.setState({ redirect: true });
    }
  };

  prevent = e => {
    e.preventDefault();
  };
  render() {
    const { eventData, redirect, edit } = this.state;

    const isIE10Mode = document['documentMode'] === 10;
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        [{ direction: 'rtl' }, { align: [] }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    };

    if (redirect) {
      return <Redirect to="/events" />;
    }
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          {edit ? 'Update Event' : 'Tambah Event'}
        </h4>

        <Card>
          <Card.Body className="media align-items-center">
            <img
              src={`${process.env.PUBLIC_URL}/img/avatars/IMG_0537.jpeg`}
              className="d-block ui-w-40 rounded-circle"
              alt=""
            />
            <div className="media-body ml-3">
              <a href="#d" onClick={this.prevent} className="text-body d-block">
                <strong>
                  {/* {this.state.articleData.author.name} */}
                  Teuku Mulia Ichsan
                </strong>
              </a>
              {/* Created at {this.state.articleData.created_at} */}
              Dibuat pada 27 November 2019
            </div>
          </Card.Body>

          <hr className="m-0" />

          <Card.Body>
            <Form.Group>
              <Form.Label>Judul Event</Form.Label>
              <Form.Control
                value={eventData.judul || ''}
                onChange={e => this.onValueChange(e)}
                name="judul"
              />
            </Form.Group>

            <Media as={Form.Group} style={{ minHeight: '1px' }}>
              <div
                className="ui-bg-cover"
                style={{
                  width: '150px',
                  height: '130px',
                  backgroundSize: 'cover',
                  backgroundImage: `url('${process.env.PUBLIC_URL}/img/no-img.png')`
                }}
              />
              <Media.Body className="ml-3">
                <Form.Label>Main image:</Form.Label>

                <label className="custom-file mt-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={e => this.onFileChange(e)}
                  />
                  <span
                    className={`custom-file-label ${
                      this.state.mainFileSelect ? '' : 'text-muted'
                    }`}
                  >
                    {this.state.mainFileSelect
                      ? this.state.mainFileSelect.name
                      : 'Select file...'}
                  </span>
                </label>
              </Media.Body>
            </Media>

            <Form.Group>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                value={eventData.id_kategori || ''}
                onChange={e => this.onValueChange(e)}
                as="select"
                className="custom-select"
                name="id_kategori"
              >
                <option value="">Pilih Kategori Event</option>
                <option value="1">Event Umum</option>
                <option value="2">Kajian</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <div className="d-flex align-items-center">
                <div className="w-100">
                  <Form.Label>Event Mulai</Form.Label>
                  <div>
                    <DatePicker
                      className="form-control"
                      name="event_mulai"
                      calendarClassName="react-datepicker--with-time"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      withPortal
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                      todayButton={'Today'}
                    />
                  </div>
                </div>
                <div className="px-2">&ndash;</div>
                <div className="w-100">
                  <Form.Label>Event Berakhir</Form.Label>
                  <div>
                    <DatePicker
                      className="form-control"
                      calendarClassName="react-datepicker--with-time"
                      selected={this.state.endDate}
                      onChange={e => this.handleChange(e)}
                      withPortal
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                      todayButton={'Today'}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Konten</Form.Label>
              {!isIE10Mode && (
                <ReactQuill
                  modules={modules}
                  value={eventData.konten || ''}
                  onChange={this.onValueChangeContent}
                  name="konten"
                />
              )}

              {/* Fallback */}
              {isIE10Mode && (
                <Form.Control
                  as="textarea"
                  value={eventData.konten || ''}
                  onChange={e => this.onValueChange(e)}
                  name="konten"
                />
              )}
            </Form.Group>
          </Card.Body>
        </Card>

        <div className="text-right mt-3">
          <Button variant="success" onClick={() => this.handleSubmit('ACTIVE')}>
            Publish
          </Button>
          &nbsp;
          <Button
            variant="primary"
            onClick={() => this.handleSubmit('INACTIVE')}
          >
            Save to Draft
          </Button>
          &nbsp;
          <Link to="/events">
            <Button variant="default">Cancel</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FormEvent;
