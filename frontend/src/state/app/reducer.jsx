import {
  MODAL_OPEN,
  MODAL_CLOSE,
  REQUEST_FAILURE,
  REQUEST_SUCCESS,
  CLEAR_SERVER_SUCCESS,
  CLEAR_SERVER_ERRORS,
  DIALOG_CONFIRM_OPEN,
  DIALOG_CONFIRM_CLOSE
} from './actionsTypes';

const initialState = {
  serverErrors: null,
  statusError: null,
  serverSuccess: null,
  modal : {
    open : false,
    description :""
  },
  dialogConfirm: {
    open: false,
    title: '',
    description: '',
    onConfirm: null
  }
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_FAILURE:
    return {
      ...state,
      serverErrors: payload.serverErrors,
      statusError: payload.statusError,
    }
    case REQUEST_SUCCESS:
    return {
      ...state,
      serverSuccess: payload,
    }
    case CLEAR_SERVER_ERRORS:
    return {
      ...state,
      serverErrors: false,
    }
    case CLEAR_SERVER_SUCCESS:
    return {
      ...state,
      serverSuccess: false,
    }
    case MODAL_OPEN:
    return {
      ...state,
      modal : {
        open : true,
        description : payload
      }
    }
    case MODAL_CLOSE:
    return {
      ...state,
      modal : {
        open : false,
        description : ""
      }
    }
    case DIALOG_CONFIRM_OPEN:
    return {
      ...state,
      dialogConfirm: {
        open: true,
        title: payload.title,
        description: payload.description,
        onConfirm: payload.onConfirm
      },
    }

    case DIALOG_CONFIRM_CLOSE:
    return {
      ...state,
      dialogConfirm: {
        open: false,
        title: '',
        description: '',
        onConfirm: null
      }
    }
    default:
    return state;
  }
};

export default appReducer;
