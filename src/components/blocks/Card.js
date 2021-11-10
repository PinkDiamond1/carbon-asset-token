import React from 'react';
import styled, {withTheme} from 'styled-components';
import {useSelector} from 'react-redux';

const CardContainer = styled('div')`
  background-color: ${props => props.theme.colors[props.selectedTheme].surface};
  box-shadow: ${props => props.theme.colors[props.selectedTheme].surfaceShadow};
  border-radius: 4px;
  padding: 16px;
  margin: 12px;
  max-height: 100%;
  overflow: auto;
  overflow-x: hidden;
`;

const Card = withTheme(({children}) => {
  const appStore = useSelector(state => state.app);

  return (
    <CardContainer selectedTheme={appStore.theme}>{children}</CardContainer>
  );
});

export {Card};
