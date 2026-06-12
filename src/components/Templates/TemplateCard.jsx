import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Box,
  Chip,
  alpha,
  ButtonGroup,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TemplateActions from '@/components/ui/TemplateActions';
import { useTheme } from '@mui/material/styles';
import useClipboard from '@/hooks/useClipboard';

/**
 * TemplateCardHeader - Modern card header matching Components section pattern
 */
const TemplateCardHeader = React.memo(
  ({ template, category, onCopy, onUse, onPreview, copied, isSelected }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          p: 2.5,
          pb: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
        }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'text.primary',
              mb: category && category !== 'all' ? 0.5 : 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            itemProp='name'>
            {template.label}
          </Typography>

          {category && category !== 'all' && (
            <Chip
              label={category}
              size='small'
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 500,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
          )}
        </Box>

        {/* Actions in top right - use shared TemplateActions component */}
        <TemplateActions
          onPreview={onPreview}
          onCopy={onCopy}
          onUse={onUse}
          copied={copied}
          isSelected={isSelected}
        />
      </Box>
    );
  }
);

TemplateCardHeader.displayName = 'TemplateCardHeader';

TemplateCardHeader.propTypes = {
  template: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  copied: PropTypes.bool,
  isSelected: PropTypes.bool,
};

/**
 * TemplatePreview - Code preview with syntax highlighting feel
 */
const TemplatePreview = React.memo(({ content, expanded = false }) => {
  const theme = useTheme();

  return (
    <Paper
      variant='outlined'
      sx={{
        background: alpha(theme.palette.background.default, 0.6),
        color: theme.palette.text.primary,
        p: 2,
        borderRadius: 1.5,
        overflowX: 'auto',
        overflowY: 'auto',
        fontSize: '0.85rem',
        minHeight: expanded ? 180 : 100,
        maxHeight: expanded ? 300 : 140,
        border: `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.default, 0.8),
          borderColor: theme.customTokens?.border || theme.palette.divider,
        },
        '&::-webkit-scrollbar': {
          width: 6,
          height: 6,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: alpha(theme.palette.text.secondary, 0.3),
          borderRadius: 3,
        },
      }}
      role='textbox'
      aria-readonly='true'
      tabIndex={0}>
      <Box
        component='pre'
        itemProp='text'
        sx={{
          margin: 0,
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.6,
        }}>
        {content}
      </Box>
    </Paper>
  );
});

TemplatePreview.displayName = 'TemplatePreview';

TemplatePreview.propTypes = {
  content: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

/**
 * TemplateCard - Modern 2026+ Design
 * Features:
 * - Clean card layout with hover effects
 * - Unified button styling matching DualActionButton from Components section
 * - Visual feedback for selected/copied states
 * - Responsive design with list/grid view support
 * - Optimized for user experience
 */
const TemplateCard = ({
  template,
  index,
  selectedIdx,
  onUseTemplate,
  onCopy,
  viewMode = 'grid',
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { copied, copyToClipboard } = useClipboard();

  const isSelected = selectedIdx === index;
  const isListView = viewMode === 'list';

  const handleCopy = async () => {
    await copyToClipboard(template.content, { contentType: 'markdown' });
    onCopy(template.content, index);
  };

  const handleUse = () => {
    onUseTemplate(template.content, index);
    setPreviewOpen(false);
  };

  const handlePreviewOpen = () => setPreviewOpen(true);
  const handlePreviewClose = () => setPreviewOpen(false);

  return (
    <>
      <Card
        sx={{
          width: '100%',
          minHeight: isListView ? 200 : 320,
          height: isListView ? 'auto' : { xs: 320, sm: 360 },
          display: 'flex',
          flexDirection: isListView ? 'row' : 'column',
          justifyContent: 'flex-start',
          bgcolor: 'background.paper',
          border: `1px solid ${
            isSelected
              ? theme.palette.primary.main
              : theme.customTokens?.borderSubtle || theme.palette.divider
          }`,
          borderRadius: 2,
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.customTokens?.shadow?.md || theme.shadows[6],
            borderColor: isSelected
              ? theme.palette.primary.main
              : theme.customTokens?.border || theme.palette.divider,
          },
          '&::before': isSelected
            ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                bgcolor: 'primary.main',
                zIndex: 1,
              }
            : {},
        }}
        component='article'
        itemScope
        itemType='https://schema.org/CreativeWork'
        aria-label={`Template: ${template.label}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Selected Badge - Only show when not hovering to avoid clutter with top buttons */}
        {isSelected && !isHovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              bgcolor: 'success.main',
              color: 'success.contrastText',
              borderRadius: 1,
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.shadows[2],
            }}>
            <CheckCircleIcon sx={{ fontSize: 20 }} />
          </Box>
        )}

        <Box
          sx={{
            flex: isListView ? '0 0 auto' : 1,
            width: isListView ? { xs: '100%', sm: '50%' } : '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <TemplateCardHeader
            template={template}
            category={template.category}
            onCopy={handleCopy}
            onUse={handleUse}
            onPreview={handlePreviewOpen}
            copied={copied}
            isSelected={isSelected}
          />

          <CardContent
            sx={{
              pt: 0,
              px: 2.5,
              pb: 2,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <Typography
              variant='body2'
              sx={{
                mb: 2,
                minHeight: isListView ? 'auto' : 40,
                color: 'text.secondary',
                lineHeight: 1.6,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: isListView ? 2 : 2,
                WebkitBoxOrient: 'vertical',
              }}
              itemProp='description'>
              {template.description}
            </Typography>

            {!isListView && <TemplatePreview content={template.content} />}
          </CardContent>
        </Box>

        {/* List View Preview */}
        {isListView && (
          <Box
            sx={{
              flex: 1,
              p: 2.5,
              pt: 3.5,
              bgcolor: alpha(theme.palette.background.default, 0.4),
              borderLeft: `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
            }}>
            <TemplatePreview content={template.content} expanded />
          </Box>
        )}
      </Card>

      {/* Full Preview Modal */}
      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth='md'
        fullWidth
        scroll='paper'
        PaperProps={{
          sx: {
            borderRadius: 2,
            position: 'fixed',
            maxHeight: '85vh',
            display: 'flex',
            overflow: 'hidden',
          },
        }}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
          }}>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
              {template.label}
            </Typography>
            {template.category && template.category !== 'all' && (
              <Chip
                label={template.category}
                size='small'
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ButtonGroup variant='contained' size='small'>
              <Button
                onClick={handleCopy}
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                color={copied ? 'success' : 'primary'}
                sx={{ borderRadius: '6px 0 0 6px' }}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                onClick={handleUse}
                startIcon={<AddIcon />}
                color='primary'
                sx={{ borderRadius: '0 6px 6px 0' }}>
                Use Template
              </Button>
            </ButtonGroup>
            <IconButton
              onClick={handlePreviewClose}
              size='small'
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.text.secondary, 0.1),
                },
              }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3, overflowY: 'auto' }}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 3, lineHeight: 1.7 }}>
            {template.description}
          </Typography>

          <Paper
            variant='outlined'
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.background.default, 0.6),
              border: `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
              maxHeight: 450,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: alpha(theme.palette.text.secondary, 0.3),
                borderRadius: 4,
              },
            }}>
            <Box
              component='pre'
              sx={{
                margin: 0,
                fontFamily:
                  'ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: 'text.primary',
              }}>
              {template.content}
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

TemplateCard.displayName = 'TemplateCard';

TemplateCard.propTypes = {
  template: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  selectedIdx: PropTypes.number,
  index: PropTypes.number.isRequired,
  onUseTemplate: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']),
};

export default React.memo(TemplateCard);
