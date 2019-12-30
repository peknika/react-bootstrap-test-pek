import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'react-quill/dist/quill.snow.css';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';

import {
  addNote as addNewNote,
  removeNote as RemoveNoteActive,
  updateNote as updateExistingNote
} from '../redux/actions/dispatchNoteActions';

const qlClasses = [
  'ql-font-serif',
  'ql-font-serif',
  'ql-font-monospace',
  'ql-size-small',
  'ql-size-large',
  'ql-size-huge'];

/* eslint-disable */
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img', 'em', 'span']),
  allowedSchemesByTag: { ...sanitizeHtml.defaults.allowedSchemesByTag.concat, img: ['data'] },
  allowedClasses: {
    p: qlClasses,
    h1: qlClasses,
    h2: qlClasses,
    em: qlClasses,
    strong: qlClasses,
    span: qlClasses,
  }
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 */
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image'
];


const ReduxReactQuill = ({
  input, meta, type, initialValue
}) => {
  console.log(input, meta, type, initialValue);
  return (
    <ReactQuill
      theme="snow"
      value={input.value || initialValue}
      modules={modules}
      formats={formats}
      type={type}
      onChange={input.onChange} />
  );
};

class EditorForm extends React.Component {
  handleSubmit = async (values) => {
    const sanitized = sanitizeHtml(values.text, sanitizeOptions);
    const {
      reset, addNote, updateNote, active
    } = this.props;
    try {
      if (active) {
        await updateNote({ id: active, text: sanitized });
      } else {
        await addNote({ text: sanitized });
      }
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  };

  handleRemoveNote = async () => {
    const { removeNote, reset, active } = this.props;
    await removeNote({ id: active });
    reset();
  };

  render() {
    const {
      handleSubmit, submitting, dirty, error, initialValues
    } = this.props;

    console.log('this.props.initialValue', submitting);
    return (
      <div className="editor-container">
        <Form onSubmit={handleSubmit(this.handleSubmit)} className="quill-form">
          <Field
            name="text"
            type="text"
            initialValue={initialValues.text}
            component={ReduxReactQuill} />
          <ButtonGroup size="sm">
            <Button variant="secondary" size="sm" inline type="submit" disabled={submitting || !dirty}>Save</Button>
            <Button
              variant="outline-secondary"
              size="sm"
              inline
              type="button"
              disabled={submitting}
              onClick={this.handleRemoveNote}>
              Delete
            </Button>
          </ButtonGroup>
          {error && <div className="ml-3">{error}</div>}
        </Form>
      </div>
    );
  }
}
EditorForm = reduxForm({
  form: 'NewNote',
  enableReinitialize: true
})(EditorForm);

export default connect(
  ({ text, notes }) => ({
    text,
    active: notes.active,
    initialValues: notes.active
      ? { text: notes.byId[notes.active].body }
      : { text: '' }
  }),
  {
    addNote: addNewNote,
    updateNote: updateExistingNote,
    removeNote: RemoveNoteActive
  }
)(EditorForm);
