import _ from 'lodash';
import {keyMirror} from '../store-functions';
import constants from '../../constants';

import {
  activateProgressIndicator,
  deactivateProgressIndicator,
  setGlobalErrorMessage,
} from './app';

import {mockedRetiredTokenResponse} from '../../mocks';

export const actions = keyMirror('GET_RETIRED_TOKENS');

const mockedTokenResponse = {
  type: actions.GET_RETIRED_TOKENS,
  // Different envs import this differently
  payload: _.get(
    mockedRetiredTokenResponse,
    'default',
    mockedRetiredTokenResponse,
  ),
};

export const getRetiredTokens = ({useMockedResponse = false}) => {
  return async dispatch => {
    try {
      dispatch(activateProgressIndicator);

      if (useMockedResponse) {
        dispatch(mockedTokenResponse);
      } else {
        const response = await fetch(`${constants.API_HOST}/tokens`);

        if (response.ok) {
          // need to re map the keys so that they are the correct order
          const results = (await response.json()).map(result => ({
            block_height: result.block_height,
            value: result.value,
            asset_name: result.asset_name,
            name: result.name,
            public_key: result.public_key,
            created_at: result.retired_at,
            notified_at: result.notified_at,
          }));

          dispatch({
            type: actions.GET_RETIRED_TOKENS,
            payload: results,
          });
        }
      }
    } catch {
      dispatch(setGlobalErrorMessage('Something went wrong...'));
    } finally {
      dispatch(deactivateProgressIndicator);
    }
  };
};
