import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Function to toggle between languages
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Tooltip title="Change Language">
      <IconButton  sx={{ color:"#dadada"}}>
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageSwitcher;