import React from 'react';
import { Paper, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import PropTypes from 'prop-types';

const MarkdownPreview = ({ markdown }) => {
  const createMarkup = React.useCallback(
    () => ({
      __html: DOMPurify.sanitize(marked.parse(markdown), {
        ADD_TAGS: ['img'],
        ADD_ATTR: ['src', 'alt', 'width', 'height', 'style'],
      }),
    }),
    [markdown]
  );

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
        position: 'relative',
        overflow: 'hidden',
        '& img': {
          maxWidth: '100%',
          height: 'auto',
        },
        '& pre': {
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '12px',
          borderRadius: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        '& code': {
          wordBreak: 'break-word',
        },
      }}>
      <Typography variant='h6' sx={{ mb: 1 }}>
        Preview
      </Typography>
      <div
        className='markdown-preview'
        style={{
          fontFamily: 'inherit',
          fontSize: 16,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '8px',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
        dangerouslySetInnerHTML={createMarkup()}
      />
    </Paper>
  );
};

MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default React.memo(MarkdownPreview);
