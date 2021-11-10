import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import styled, {withTheme} from 'styled-components';
import ReactPaginate from 'react-paginate';

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
  font-family: ${props => props.theme.typography.primary};
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

const StyledPaginateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .pagination {
    padding: 0;
    color: ${props => props.theme.colors[props.selectedTheme].onSurface};
    list-style-type: none;
    display: flex;
  }
  .break-me {
    cursor: default;
  }
  .active {
    border-color: transparent;
    background-color: ${props =>
      props.selectedTheme === constants.THEME.DARK
        ? props.theme.colors[props.selectedTheme].onSurfacePrimaryVarient
        : props.theme.colors[props.selectedTheme].onSurfaceSecondaryVarient};

    color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  }
  li {
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DataTable = withTheme(({headings, data}) => {
  const [currentPage, setPage] = useState(0);
  const appStore = useSelector(state => state.app);

  const handlePageClick = event => {
    setPage(event.selected);
  };

  if (currentPage > data.length) {
    setPage(0);
    return;
  }

  return (
    <>
      <StyledPaginateContainer selectedTheme={appStore.theme}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          forcePage={currentPage}
          pageRangeDisplayed={5}
          pageCount={(data && data.length) || 0}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          breakClassName="break-me"
        />
      </StyledPaginateContainer>
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
        <tbody>
          {data[currentPage].map((record, index) => (
            <TableRow index={index} selectedTheme={appStore.theme} key={index}>
              {Object.keys(record).map((key, index) => (
                <TableData selectedTheme={appStore.theme} key={index}>
                  {record[key]}
                </TableData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export {DataTable};
