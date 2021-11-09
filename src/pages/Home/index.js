import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getRetiredTokens} from '../../store/actions/tokens';

const Home = () => {
  const dispatch = useDispatch();
  const tokenStore = useSelector(state => state.tokens);

  useEffect(
    () => dispatch(getRetiredTokens({useMockedResponse: true})),
    [dispatch],
  );

  if (!tokenStore.retiredTokens) {
    return null;
  }

  return (
    <div>
      {tokenStore.retiredTokens.map(token => (
        <div key={token.coin_id}>{token.public_key}</div>
      ))}
    </div>
  );
};

export {Home};
