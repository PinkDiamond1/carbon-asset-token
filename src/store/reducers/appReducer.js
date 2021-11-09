import u from 'updeep';

import {actions as appActions} from '../actions/app';
import {actions} from '../actions/tokens';
import constants from '../../constants';

const initialState = {
  placeholderValue: 'THIS STRING WAS LOADED FROM THE STORE!',
  showProgressOverlay: false,
  theme: constants.THEME.DARK,
  errorMessage: null,
  localOverride: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.ACTIVATE_PROGRESS_INDICATOR:
      return u({showProgressOverlay: true}, state);

    case appActions.DEACTIVATE_PROGRESS_INDICATOR:
      return u({showProgressOverlay: false}, state);

    case appActions.SET_GLOBAL_ERROR_MESSAGE:
      return u({errorMessage: actions.payload}, state);

    case appActions.CLEAR_GLOBAL_ERROR_MESSAGE:
      return u({errorMessage: null}, state);

    case appActions.SET_LOCALE_OVERRIDE:
      return u({localOverride: actions.payload}, state);

    case appActions.TOGGLE_THEME:
      return u(
        {
          theme:
            state.theme === constants.THEME.DARK
              ? constants.THEME.LIGHT
              : constants.THEME.DARK,
        },
        state,
      );
    default:
      return state;
  }
};

export {appReducer};
