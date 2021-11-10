import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MiniSearch from 'minisearch';

import {Card, DataTable} from '../../components';
import {getRetiredTokens} from '../../store/actions/tokens';

const miniSearch = new MiniSearch({
  fields: [
    'id',
    'coin_id',
    'name',
    'public_key',
    'value',
    'block_height',
    'created_at',
    'notified_at',
  ],
  extractField: (document, fieldName) => {
    if (fieldName === 'id') {
      return document['coin_id'];
    }
    return document[fieldName];
  },
  searchOptions: {
    processTerm: term => term.toLowerCase(),
    boost: {name: 2},
    fuzzy: 0,
  },
});

const Home = () => {
  const dispatch = useDispatch();
  const tokenStore = useSelector(state => state.tokens);
  const [search, setSearch] = useState();

  useEffect(
    () => dispatch(getRetiredTokens({useMockedResponse: true})),
    [dispatch],
  );

  useEffect(() => {
    if (tokenStore.retiredTokens) {
      miniSearch.addAll(tokenStore.retiredTokens);
    }
  }, [tokenStore.retiredTokens]);

  const tokenResults = useMemo(() => {
    if (!tokenStore.retiredTokens) {
      return undefined;
    }

    if (!search || search.length === 0) {
      return tokenStore.retiredTokens;
    }

    return tokenStore.retiredTokens.filter(token =>
      search.includes(token.coin_id),
    );
  }, [tokenStore.retiredTokens, search]);

  const handleSearchInputChange = event => {
    const search = miniSearch.search(event.target.value, {prefix: true});
    console.log(search);
    setSearch(search.map(result => result.id));
  };

  if (!tokenResults) {
    return null;
  }

  return (
    <>
      <Card>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
      </Card>
      <Card>
        <DataTable
          headings={[
            'Coin ID',
            'Name',
            'Public Key',
            'Value',
            'Block Height',
            'Created At',
            'Notified At',
          ]}
          data={tokenResults}
        />
      </Card>
    </>
  );
};

export {Home};
