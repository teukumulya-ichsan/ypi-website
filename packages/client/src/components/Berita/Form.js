import React, { Component } from 'react';
import { Card, Button, Form, Media } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
// import CreatableSelect from 'react-select/creatable';
import '../../vendor/libs/react-select/react-select.scss';
import loadable from '@loadable/component';
import '../../vendor/libs/react-quill/typography.scss';
import '../../vendor/libs/react-quill/editor.scss';
import axios from 'axios';
import ReactSwal from '../../shared/Swall';

// Catch error in IE10
const ReactQuill = loadable(
  () =>
    new Promise(resolve =>
      import('react-quill')
        .then(Component => resolve(Component))
        .catch(() => resolve(<div />))
    )
);

class FormBerita extends Component {
  state = {
    articleData: { konten: '', category: { category_id: '' } },
    articleEdit: {},
    mainFileSelect: null,
    edit: false,
    redirect: false,
    preview: `${process.env.PUBLIC_URL}/img/no-img.png`,
    category: []
  };

  componentDidMount = async () => {
    // console.log('PATH', this.props.location.pathname);
    this.getCategory();
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      const { data } = await axios.get(`http://localhost:4001/berita/${id}`);

      if (data.status === 200) {
        let preview =
          data.data.photo_url !== ''
            ? 'berita/' + data.data.photo_url
            : 'no-img.png';

        this.setState({
          articleData: {
            ...data.data,
            id_kategori: data.data.category.category_id
          },
          preview: `${process.env.PUBLIC_URL}/img/` + preview,
          edit: true,

          articleEdit: { photo_url_lama: data.data.photo_url }
        });
      }
    }
  };

  getCategory = () => {
    axios.get('http://localhost:4001/category-berita').then(res => {
      console.log(res.data);
      this.setState({
        category: res.data.data
      });
    });
  };

  onValueChange = ({ target }) => {
    this.setState({
      articleData: {
        ...this.state.articleData,
        [target.name]: target.value
      }
    });

    if (this.state.edit) {
      this.setState({
        articleEdit: {
          ...this.state.articleEdit,
          [target.name]: target.value
        }
      });
    }
  };

  onValueChangeContent = value => {
    this.setState({
      articleData: {
        ...this.state.articleData,
        konten: value
      }
    });

    if (this.state.edit) {
      this.setState({
        articleEdit: {
          ...this.state.articleEdit,
          konten: value
        }
      });
    }
  };

  onFileChange = e => {
    if (e.target.files.length) {
      this.setState({
        articleData: {
          ...this.state.articleData,
          photo_url: e.target.files[0]
        },
        preview: URL.createObjectURL(e.target.files[0])
      });
    } else {
      this.setState({
        articleData: {
          ...this.state.articleData,
          photo_url: ''
        },
        preview: `${process.env.PUBLIC_URL}/img/no-img.png`
      });
    }

    if (this.state.edit) {
      if (e.target.files.length) {
        this.setState({
          articleEdit: {
            ...this.state.articleEdit,
            photo_url: e.target.files[0]
          },
          preview: URL.createObjectURL(e.target.files[0])
        });
      }
    }
  };

  handleSubmit = async status => {
    const { articleData, edit, articleEdit } = this.state;
    let sendData = {};
    let formData = new FormData();

    if (!edit) {
      Object.keys(articleData).forEach(item => {
        formData.append(item, articleData[item]);
      });
      formData.append('status', status);
      // console.log(formData);
      sendData = await axios.post('http://localhost:4001/berita', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      Object.keys(articleEdit).forEach(item => {
        formData.append(item, articleEdit[item]);
      });
      formData.append('status', status);

      sendData = await axios.put(
        `http://localhost:4001/berita/${articleData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    }

    if (sendData.status === 200) {
      await ReactSwal.fire('Berhasil!', sendData.data.data.message, 'success');
      this.setState({ redirect: true });
    } else {
      await ReactSwal.fire('Error', sendData.data.data.error, 'error');
      this.setState({ redirect: true });
    }
  };

  prevent = e => {
    e.preventDefault();
  };

  render() {
    const { articleData, redirect, edit, preview } = this.state;

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
      return <Redirect to="/berita" />;
    }

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          {edit ? 'Update Berita' : 'Buat Berita'}
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
          <Card.Body className="pb-2">
            <Form.Group>
              <Form.Label>Judul</Form.Label>
              <Form.Control
                value={articleData.judul || ''}
                onChange={e => this.onValueChange(e)}
                name="judul"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ringkasan</Form.Label>
              <Form.Control
                value={articleData.ringkasan || ''}
                onChange={e => this.onValueChange(e)}
                name="ringkasan"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Konten</Form.Label>
              {!isIE10Mode && (
                <ReactQuill
                  modules={modules}
                  value={articleData.konten || ''}
                  onChange={this.onValueChangeContent}
                  name="konten"
                />
              )}

              {/* Fallback */}
              {isIE10Mode && (
                <Form.Control
                  as="textarea"
                  value={articleData.konten || ''}
                  onChange={e => this.onValueChange(e)}
                  name="konten"
                />
              )}
            </Form.Group>

            <Media as={Form.Group} style={{ minHeight: '1px' }}>
              <div
                className="ui-bg-cover"
                style={{
                  width: '150px',
                  height: '130px',
                  backgroundSize: 'cover',
                  backgroundImage: `url('${preview}')`
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
                      articleData.photo_url ? '' : 'text-muted'
                    }`}
                  >
                    {articleData.photo_url
                      ? articleData.photo_url.name
                      : 'Select file...'}
                  </span>
                </label>

                <div style={{ marginTop: '10px' }}>
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      this.setState({
                        preview: `${process.env.PUBLIC_URL}/img/no-img.png`,
                        articleEdit: {
                          ...this.state.articleEdit,
                          photo_url: ''
                        }
                      })
                    }
                  >
                    Reset
                  </Button>
                </div>
              </Media.Body>
            </Media>

            <Form.Group>
              <Form.Label>Kategori</Form.Label>

              <Form.Control
                value={articleData.id_kategori || ''}
                onChange={e => this.onValueChange(e)}
                as="select"
                className="custom-select"
                name="id_kategori"
              >
                <option value="">Pilih Kategori Berita</option>
                {this.state.category.map(item => (
                  <option value={item.id}>{item.nama}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Card.Body>
          <hr className="m-0" />
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
          <Link to="/berita">
            <Button variant="default">Cancel</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FormBerita;
