import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { addTask as addNewTask } from '../redux/actions/dispatchTaskActions';

const ReduxFormControl = ({
  input, type, required, placeholder
}) => (
  <FormControl
    block
    type={type}
    required={required}
    placeholder={placeholder}
    value={input.value}
    onChange={input.onChange} />
);

class NewTaskForm extends React.Component {
  handleSubmit = async (values) => {
    const { reset, addTask } = this.props;
    try {
      await addTask({ task: values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="text"
          required
          type="text"
          placeholder="I'm going to..."
          component={ReduxFormControl} />
        <Button variant="info" size="sm" block type="submit" disabled={submitting || pristine}>Add</Button>
        {error && <div className="ml-3">{error}</div>}
      </Form>
    );
  }
}

const ConnectedNewTaskForm = connect(
  (state) => ({ text: state.text }),
  { addTask: addNewTask }
)(NewTaskForm);
export default reduxForm({
  form: 'newTask'
})(ConnectedNewTaskForm);
