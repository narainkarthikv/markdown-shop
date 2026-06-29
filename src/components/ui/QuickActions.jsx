import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, Button, ButtonGroup } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const QuickActions = ({ onPreview, onCopy, onUse, copied, isSelected }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexShrink: 0,
      }}>
      <Tooltip title='Preview template' arrow>
        <IconButton
          onClick={onPreview}
          size='small'
          sx={{
            color: 'primary.main',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
          aria-label='Preview template'>
          <VisibilityIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <ButtonGroup
        size='small'
        variant='contained'
        sx={{
          gap: 1,
        }}>
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow>
          <Button
            onClick={onCopy}
            color={copied ? 'success' : 'primary'}
            sx={{
              minWidth: 'auto',
              px: 1.5,
              py: 0.75,
            }}
            aria-label={
              copied ? 'Copied to clipboard' : 'Copy template to clipboard'
            }>
            {copied ? (
              <CheckIcon fontSize='small' />
            ) : (
              <ContentCopyIcon fontSize='small' />
            )}
          </Button>
        </Tooltip>
        <Tooltip title='Insert into editor' arrow>
          <Button
            onClick={onUse}
            color='primary'
            sx={{ minWidth: 'auto', px: 1.5, py: 0.75 }}
            aria-label='Use template in editor'>
            {isSelected ? (
              <CheckCircleIcon fontSize='small' />
            ) : (
              <AddIcon fontSize='small' />
            )}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
};

QuickActions.propTypes = {
  onPreview: PropTypes.func,
  onCopy: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  copied: PropTypes.bool,
  isSelected: PropTypes.bool,
};

QuickActions.defaultProps = {
  onPreview: undefined,
  copied: false,
  isSelected: false,
};

export default React.memo(QuickActions);
