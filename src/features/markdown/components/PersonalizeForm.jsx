import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useMarkdownStore from '../store/markdownStore';
import { MARKDOWN_THEME_OPTIONS as THEME_OPTIONS } from '@/config/index';

const themeOptions = Object.entries(THEME_OPTIONS).map(([key, value]) => ({
  value: value,
  label: key.charAt(0) + key.slice(1).toLowerCase(),
}));

const PersonalizeForm = () => {
  const { userName, setUserName, theme, setTheme } = useMarkdownStore();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
      <TextField
        id='userName'
        label='Name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Your name'
        size='small'
        fullWidth
      />
      <FormControl size='small' fullWidth>
        <InputLabel id='theme-label'>Theme</InputLabel>
        <Select
          labelId='theme-label'
          id='theme'
          value={theme}
          label='Theme'
          onChange={(e) => setTheme(e.target.value)}>
          {themeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default React.memo(PersonalizeForm);
