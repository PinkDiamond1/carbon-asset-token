import _ from 'lodash';

import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MiniSearch from 'minisearch';
import {useIntl} from 'react-intl';

import constants from '../../constants';
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
  const intl = useIntl();
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

  // Chunk the tokenResults into pages for pagination
  const tokenResultsPages = useMemo(() => {
    if (!tokenStore.retiredTokens) {
      return undefined;
    }

    if (!search || search.length === 0) {
      return _.chunk(tokenStore.retiredTokens, constants.MAX_TABLE_SIZE);
    }

    return _.chunk(
      _.sortBy(
        tokenStore.retiredTokens.filter(token =>
          search.includes(token.coin_id),
        ),
        item => search.indexOf(item.coin_id),
      ),
      constants.MAX_TABLE_SIZE,
    );
  }, [tokenStore.retiredTokens, search]);

  const handleSearchInputChange = event => {
    const search = miniSearch.search(event.target.value, {prefix: true});
    console.log(search);
    setSearch(search.sort(result => result.score).map(result => result.id));
  };

  if (!tokenResultsPages) {
    return null;
  }

  return (
    <>
      <Card>
        <input
          type="text"
          placeholder={intl.formatMessage({id: 'search'})}
          onChange={handleSearchInputChange}
        />
      </Card>
      <div style={{height: '700px'}}>
        <Card>
          <DataTable
            headings={[
              intl.formatMessage({id: 'coin-id'}),
              intl.formatMessage({id: 'name'}),
              intl.formatMessage({id: 'public-key'}),
              intl.formatMessage({id: 'value'}),
              intl.formatMessage({id: 'block-height'}),
              intl.formatMessage({id: 'created-at'}),
              intl.formatMessage({id: 'notified-at'}),
            ]}
            data={tokenResultsPages}
          />
        </Card>
      </div>
    </>
  );
};

export {Home};
