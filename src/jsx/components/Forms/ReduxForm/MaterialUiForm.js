import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@mui/material/TextField'; // Updated import
import Radio from '@mui/material/Radio'; // Updated import for RadioButton
import RadioGroup from '@mui/material/RadioGroup'; // Updated import for RadioButtonGroup
import FormControlLabel from '@mui/material/FormControlLabel'; // Updated import for FormControlLabel
import Checkbox from '@mui/material/Checkbox'; // Updated import
import Select from '@mui/material/Select'; // Updated import for SelectField
import MenuItem from '@mui/material/MenuItem'; // Updated import
import asyncValidate from './AsyncValidate';
import validate from './Validate';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    error={touched && Boolean(error)}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        className="input-field-redux"
        checked={input.value ? true : false}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);

const renderRadioGroup = ({ input, children, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    value={input.value}
    onChange={(event) => input.onChange(event.target.value)}
  >
    {children}
  </RadioGroup>
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <Select
    label={label}
    error={touched && Boolean(error)}
    {...input}
    onChange={(event) => input.onChange(event.target.value)}
    {...custom}
  >
    {children}
  </Select>
);

const MaterialUiForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="validate-redux-form row">
        <div className="col-sm-6">
          <Field name="firstName" className="input-field-redux" component={renderTextField} label="First Name" />
        </div>
        <div className="col-sm-6">
          <Field name="lastName" className="input-field-redux" component={renderTextField} label="Last Name" />
        </div>
        <div className="col-sm-6">
          <Field name="email" className="input-field-redux" component={renderTextField} label="Email" />
        </div>
        <div className="col-sm-6 mt-5">
          <Field name="sex" className="input-field-redux d-flex" component={renderRadioGroup}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </Field>
        </div>
        <div className="col-sm-12 mb-4">
          <Field name="favoriteColor" className="input-field-redux" component={renderSelectField} label="Favorite Color">
            <MenuItem value="ff0000">Red</MenuItem>
            <MenuItem value="00ff00">Green</MenuItem>
            <MenuItem value="0000ff">Blue</MenuItem>
          </Field>
        </div>
        <div className="col-sm-12 mt-2 mb-2">
          <Field name="employed" className="input-field-redux" component={renderCheckbox} label="I agree to all statements in terms of service" />
        </div>
        <div className="col-sm-12 mb-2">
          <Field
            className="input-field-redux"
            name="notes" component={renderTextField}
            label="Notes" multiline rows={2}
          />
        </div>
        <div className="col-sm-12 text-center">
          <button className="btn btn-primary me-1" type="submit" disabled={pristine || submitting}>Submit</button>
          <button className="btn btn-light ms-1" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </div>	
    </form>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm);
