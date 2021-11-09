import React from 'react';
import styled, {withTheme} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import constants from '../../constants';
import {toggleTheme} from '../../store/actions/app';
import {H1, ChiaLogo, LightThemeIcon, DarkThemeIcon} from '../../components';

const AppHeaderContainer = styled('header')`
  width: 100%;
  height: 64px;
  background-color: ${props => props.theme.colors[props.selectedTheme].surface};
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled('div')`
  width: 99px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThemeSwitchContainer = styled('div')`
  padding: 0 50px;
`;

const AppHeader = withTheme(() => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.app);

  const handleThemeSwitch = () => {
    dispatch(toggleTheme);
  };

  return (
    <AppHeaderContainer selectedTheme={appStore.theme}>
      <LogoContainer>
        <ChiaLogo width={65} height={25} />
      </LogoContainer>
      <H1>
        <FormattedMessage id="app-title" />
      </H1>
      <ThemeSwitchContainer onClick={handleThemeSwitch}>
        {appStore.theme === constants.THEME.DARK ? (
          <LightThemeIcon cursor="pointer" />
        ) : (
          <DarkThemeIcon cursor="pointer" />
        )}
      </ThemeSwitchContainer>
    </AppHeaderContainer>
  );
});

export {AppHeader};