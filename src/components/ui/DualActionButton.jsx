import { memo } from 'react';
import { ButtonGroup, Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import useClipboard from '@/hooks/useClipboard';
import useMarkdownStore from '@/features/markdown/store/markdownStore';

/**
 * DualActionButton - Clipboard-first pattern with primary Copy and secondary Insert actions
 *
 * @param {string} content - Content to copy/insert
 * @param {string} contentType - Type: 'text' | 'markdown' | 'svg' | 'url'
 * @param {string} variant - 'default' | 'compact' | 'icon-only'
 * @param {string} label - Primary button label (default: 'Copy')
 * @param {string} size - MUI button size: 'small' | 'medium' | 'large'
 * @param {string} color - MUI button color
 * @param {boolean} fullWidth - Make button full width
 */
const DualActionButton = memo(
  ({
    content,
    contentType = 'markdown',
    variant = 'default',
    label = 'Copy',
    size = 'medium',
    color = 'primary',
    fullWidth = false,
    onInsert,
    ...props
  }) => {
    const { insertSection } = useMarkdownStore();
    const { copied, copyToClipboard } = useClipboard();

    const handleCopy = () => {
      copyToClipboard(content, contentType);
    };

    const handleInsert = () => {
      if (onInsert) onInsert();
      else insertSection(content);
    };

    // Icon-only variant (for tight spaces)
    if (variant === 'icon-only') {
      return (
        <ButtonGroup
          size={size}
          variant='contained'
          sx={{
            minWidth: 'auto',
            gap: 0.75,
            '& .MuiButtonGroup-grouped': {
              borderRadius: 'var(--ms-radius-lg)',
            },
          }}>
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} arrow>
            <Button
              onClick={handleCopy}
              color={copied ? 'success' : color}
              aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
                borderRadius: 'var(--ms-radius-lg)',
              }}
              {...props}>
              {copied ? (
                <CheckIcon fontSize='small' />
              ) : (
                <ContentCopyIcon fontSize='small' />
              )}
            </Button>
          </Tooltip>
          <Tooltip title='Insert into editor' arrow>
            <Button
              onClick={handleInsert}
              color={color}
              aria-label='Insert into editor'
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
                borderRadius: 'var(--ms-radius-lg)',
              }}
              {...props}>
              <AddIcon fontSize='small' />
            </Button>
          </Tooltip>
        </ButtonGroup>
      );
    }

    // Compact variant (icon + secondary icon)
    if (variant === 'compact') {
      return (
        <ButtonGroup size={size} variant='contained' fullWidth={fullWidth}>
          <Button
            onClick={handleCopy}
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            color={copied ? 'success' : color}
            sx={{ flex: 1, borderRadius: 'var(--ms-radius-lg)' }}
            {...props}>
            {copied ? 'Copied' : label}
          </Button>
          <Tooltip title='Insert into editor' arrow>
            <Button
              onClick={handleInsert}
              color={color}
              sx={{
                minWidth: 'auto',
                px: 2,
                borderRadius: 'var(--ms-radius-lg)',
              }}
              {...props}>
              <AddIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
      );
    }

    // Default variant (full labels on both buttons)
    return (
      <ButtonGroup size={size} variant='contained' fullWidth={fullWidth}>
        <Button
          onClick={handleCopy}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          color={copied ? 'success' : color}
          sx={{ flex: 1, borderRadius: 'var(--ms-radius-lg)' }}
          {...props}>
          {copied ? 'Copied!' : label}
        </Button>
        <Button
          onClick={handleInsert}
          startIcon={<AddIcon />}
          color={color}
          variant='outlined'
          sx={{ borderRadius: 'var(--ms-radius-lg)' }}
          {...props}>
          Insert
        </Button>
      </ButtonGroup>
    );
  }
);

DualActionButton.displayName = 'DualActionButton';

export default DualActionButton;
