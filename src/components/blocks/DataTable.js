import React from 'react';
import {useSelector} from 'react-redux';
import styled, {withTheme} from 'styled-components';

import constants from '../../constants';

const Table = styled('table')`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  box-shadow: ${props => props.theme.colors[props.selectedTheme].surfaceShadow};
`;

const TableHead = styled('thead')`
  font-weight: 500;
  background-color: ${props =>
    props.theme.colors[props.selectedTheme].onSurfaceSecondaryVarient};
`;

const TableHeader = styled('th')`
  padding: 16px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  display: table-cell;
  text-align: left;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: ${props =>
    props.selectedTheme === constants.THEME.DARK
      ? '1px solid rgba(81, 81, 81, 1)'
      : '1px solid rgba(224, 224, 224, 1)'};

  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

const TableHeaderStart = styled(TableHeader)`
  border-top-left-radius: 4px;
`;

const TableHeaderEnd = styled(TableHeader)`
  border-top-right-radius: 4px;
`;

const TableRow = styled('tr')`
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  background-color: ${props => props.theme.colors[props.selectedTheme].surface};

  ${props =>
    props.index % 2 === 0 &&
    `
  background-color: ${
    props.theme.colors[props.selectedTheme].onSurfacePrimaryVarient
  };
  `}
`;

const TableData = styled('td')`
  display: table-cell;
  padding: 16px;
  font-size: 0.875rem;
  text-align: left;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: 1px solid
    ${props =>
      props.selectedTheme === constants.THEME.DARK
        ? 'rgba(81, 81, 81, 1)'
        : 'rgba(224, 224, 224, 1)'};
  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

const DataTable = withTheme(({headings, data}) => {
  const appStore = useSelector(state => state.app);

  return (
    <Table selectedTheme={appStore.theme}>
      <TableHead selectedTheme={appStore.theme}>
        <tr>
          {headings.map((heading, index) => {
            let Th = TableHeader;
            if (index === 0) {
              Th = TableHeaderStart;
            }
            if (index === headings.length - 1) {
              Th = TableHeaderEnd;
            }
            return (
              <Th selectedTheme={appStore.theme} key={index}>
                {heading}
              </Th>
            );
          })}
        </tr>
      </TableHead>
      {data.map((record, index) => (
        <TableRow index={index} selectedTheme={appStore.theme} key={index}>
          {Object.keys(record).map((key, index) => (
            <TableData selectedTheme={appStore.theme} key={index}>
              {record[key]}
            </TableData>
          ))}
        </TableRow>
      ))}
    </Table>
  );
});

export {DataTable};
