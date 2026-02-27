import React from 'react';
import { TextField, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const MarkdownEditor = React.memo(({ value, onChange }) => (
  <Paper
    elevation={3}
    sx={{
      flex: 1,
      p: 2,
      minHeight: 0,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Typography variant='h6' sx={{ mb: 1 }}>
      Markdown Editor
    </Typography>
    <TextField
      multiline
      minRows={1}
      maxRows={1}
      value={value}
      onChange={onChange}
      fullWidth
      variant='outlined'
      placeholder='Write your README markdown here...'
      inputProps={{ style: { height: '100%' } }}
      InputProps={{
        sx: {
          height: '100%',
          alignItems: 'stretch',
        },
      }}
      sx={{
        flex: 1,
        minHeight: 0,
        height: '100%',
        '& .MuiInputBase-root': {
          height: '100%',
          alignItems: 'flex-start',
        },
        '& .MuiInputBase-inputMultiline': {
          height: '100%',
          overflow: 'auto',
        },
        '& textarea': {
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          fontSize: 14,
          lineHeight: 1.6,
        },
      }}
    />
  </Paper>
));

MarkdownEditor.displayName = 'MarkdownEditor';

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MarkdownEditor;
