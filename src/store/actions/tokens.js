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
        const response = await fetch(`https://${constants.API_HOST}/tokens`);

        if (response.ok) {
          // need to re map the keys so that they are the correct order
          const results = (await response.json()).map(value => ({
            coin_id: value.coin_id,
            name: 'Bear Company',
            public_key: value.public_key,
            value: value.value,
            block_height: value.block_height,
            created_at: value.created_at,
            notified_at: value.notified_at,
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
