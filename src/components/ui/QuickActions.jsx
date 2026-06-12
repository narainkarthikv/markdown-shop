import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, Button, ButtonGroup, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const QuickActions = ({ onPreview, onCopy, onUse, copied, isSelected }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title='Preview' arrow>
        <IconButton
          onClick={onPreview}
          size='small'
          sx={{
            color: 'primary.main',
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          }}
          aria-label='Preview'>
          <VisibilityIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <ButtonGroup size='small' variant='contained' sx={{ ml: 1 }}>
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow>
          <Button
            onClick={onCopy}
            color={copied ? 'success' : 'primary'}
            sx={{ minWidth: 'auto', px: 1.5 }}
            aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}>
            {copied ? <CheckIcon fontSize='small' /> : <ContentCopyIcon fontSize='small' />}
          </Button>
        </Tooltip>

        <Tooltip title={isSelected ? 'Added' : 'Insert'} arrow>
          <Button
            onClick={onUse}
            color={isSelected ? 'success' : 'primary'}
            sx={{ minWidth: 'auto', px: 1.5 }}
            aria-label={isSelected ? 'Added' : 'Insert'}>
            {isSelected ? <CheckCircleIcon fontSize='small' /> : <AddIcon fontSize='small' />}
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
