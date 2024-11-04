import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Updated imports
import showResults from './ShowResults';
import MaterialUiForm from './MaterialUiForm';

const ReduxForm = (props) => {
  // Create a theme instance
  const theme = createTheme();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ThemeProvider theme={theme}>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Form</h4>
              </div>
              <div className="card-body">
                <MaterialUiForm onSubmit={showResults} />
              </div>
            </div>
          </ThemeProvider>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Result</h4>
            </div>
            <div className="card-body">
              <pre className="" id="ReduxFormJSON">
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReduxForm;
