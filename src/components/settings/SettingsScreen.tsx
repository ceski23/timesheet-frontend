import React, { FC, ReactElement, useEffect } from 'react';
import { useThunkDispatch } from 'store';
import { setScreen } from 'features/appState/slice';
import {
  styled, Typography, useTheme, useMediaQuery,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LanguageSelector } from 'components/LanguageSelector';
import { ThemeChooser } from './ThemeChooser';
import { SettingsSection } from './SettingsSection';

const Container = styled('div')(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0px`,
  flex: 1,

  [theme.breakpoints.up('md')]: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
}));

// TODO: Fix content not centered vertially
const Summary = styled(AccordionSummary)({
  '& .MuiExpansionPanelSummary-content': {
    alignItems: 'center',
  },
});

export const SettingsScreen: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const upMedium = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(setScreen('settings'));
  }, []);

  return (
    <Container>

      <SettingsSection title={t('settings.appearance')}>
        <Accordion square={!upMedium}>
          <Summary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="theme-content"
            id="theme-header"
          >
            <Typography>{t('settings.theme')}</Typography>
          </Summary>
          <AccordionDetails>
            <ThemeChooser />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={false} square={!upMedium}>
          <Summary
            aria-controls="language-content"
            id="language-header"
          >
            <Typography>{t('settings.language')}</Typography>
            <div style={{ flex: 1 }} />
            <LanguageSelector />
          </Summary>
        </Accordion>
      </SettingsSection>

    </Container>
  );
};
