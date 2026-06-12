import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TemplateActions = ({ onPreview, onCopy, onUse, copied, isSelected }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title='Preview template' arrow>
        <IconButton
          onClick={onPreview}
          size='small'
          sx={{
            color: 'primary.main',
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          }}
          aria-label='Preview template'>
          <VisibilityIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow>
        <IconButton
          onClick={onCopy}
          size='small'
          color={copied ? 'success' : 'default'}
          aria-label={copied ? 'Copied to clipboard' : 'Copy template to clipboard'}
          sx={{
            '&:hover': { bgcolor: alpha(theme.palette.action.active, 0.06) },
          }}>
          {copied ? <CheckIcon fontSize='small' /> : <ContentCopyIcon fontSize='small' />}
        </IconButton>
      </Tooltip>

      <Tooltip title={isSelected ? 'Added' : 'Insert into editor'} arrow>
        <IconButton
          onClick={onUse}
          size='small'
          color={isSelected ? 'success' : 'primary'}
          aria-label={isSelected ? 'Template added' : 'Use template in editor'}
          sx={{
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          }}>
          {isSelected ? <CheckCircleIcon fontSize='small' /> : <AddIcon fontSize='small' />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

TemplateActions.propTypes = {
  onPreview: PropTypes.func,
  onCopy: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  copied: PropTypes.bool,
  isSelected: PropTypes.bool,
};

TemplateActions.defaultProps = {
  onPreview: undefined,
  copied: false,
  isSelected: false,
};

export default React.memo(TemplateActions);
