import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined';

const MarkdownEditor = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        minHeight: 0,
        minWidth: 0,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: theme.palette.background.default,
      }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        spacing={1}
        sx={{ mb: 1, flexShrink: 0 }}>
        <Typography variant='h6'>Markdown Editor</Typography>
        <Stack direction='row' spacing={0.75} flexWrap='wrap' useFlexGap>
          <Button
            component={Link}
            to='/components'
            size='small'
            variant='outlined'
            startIcon={<WidgetsOutlined />}>
            Components
          </Button>
          <Button
            component={Link}
            to='/templates'
            size='small'
            variant='outlined'
            startIcon={<DescriptionOutlined />}>
            Templates
          </Button>
          <Button
            component={Link}
            to='/prompts'
            size='small'
            variant='outlined'
            startIcon={<LightbulbOutlined />}>
            Prompts
          </Button>
        </Stack>
      </Stack>
      <textarea
        value={value}
        onChange={onChange}
        placeholder='Write your README markdown here...'
        style={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '14px',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 'var(--ms-radius-xs)',
          resize: 'none',
          overflowY: 'auto',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      />
    </Paper>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(MarkdownEditor);
