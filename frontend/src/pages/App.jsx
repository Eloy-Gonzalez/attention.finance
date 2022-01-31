// @Vendors
import React from 'react';
import { Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

// @Actions
import {
  MODAL_CLOSE,
  CLEAR_SERVER_ERRORS,
  CLEAR_SERVER_SUCCESS,
  DIALOG_CONFIRM_CLOSE
} from 'state/app/actionsTypes';

// @Components
import { Snackbar } from '@mui/material';
import MaterialModal from 'components/MaterialModal';
import DialogConfirm from 'components/DialogConfirm';

// @Views
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

// @Routes
import PublicRouter from './PublicRouter';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const { serverErrors, serverSuccess, modal, dialogConfirm } = useSelector(
    (state) => state.appReducer
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
        open={!!serverSuccess}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: CLEAR_SERVER_SUCCESS })}
      >
         <Alert onClose={() => dispatch({ type: CLEAR_SERVER_SUCCESS })} severity="success" sx={{ width: '100%' }}>
          {serverSuccess}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
        open={!!serverErrors}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: CLEAR_SERVER_ERRORS })}
      >
         <Alert onClose={() => dispatch({ type: CLEAR_SERVER_ERRORS })} severity="error" sx={{ width: '100%' }}>
          {serverErrors}
        </Alert>
      </Snackbar>

      <Switch>
        <PublicRouter exact path='/' alias='Attention Finance | Home' component={Home} />
        <PublicRouter alias='Attention Finance | 404 Not Found' component={NotFound} />
        <Redirect to="/" />
      </Switch>

      <MaterialModal
        open={modal.open}
        handleClose={() => dispatch({ type: MODAL_CLOSE })}>
        {modal.description}
      </MaterialModal>

      <DialogConfirm
        dialogTitle={dialogConfirm.title}
        dialogText={dialogConfirm.description}
        open={dialogConfirm.open}
        onClose={() => dispatch({ type: DIALOG_CONFIRM_CLOSE })}
        onConfirm={() => dialogConfirm.onConfirm()}
      />
    </>
  );
}

export default App;
