import React, { FC, ReactElement } from 'react';
import {
  styled, Typography, useTheme, useMediaQuery, withStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { ThemeChooser } from './ThemeChooser';
import { SettingsSection } from './SettingsSection';
import { LanguageSelector } from './LanguageSelector';

// #region styles
const Container = styled('div')(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0px`,
  flex: 1,

  [theme.breakpoints.up('md')]: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
  },
}));

const Summary = withStyles({
  content: {
    alignItems: 'center',
  },
})(AccordionSummary);
// #endregion

export const SettingsScreen: FC = (): ReactElement => {
  useAppScreen('settings');
  const { t } = useTranslation();
  const theme = useTheme();
  const upMedium = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ScreenWrapper title="Ustawienia">
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
    </ScreenWrapper>
  );
};
