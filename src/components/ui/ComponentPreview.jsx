import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SvgDownloadButton from './SvgDownloadButton';
import DualActionButton from './DualActionButton';

const ComponentPreview = ({
  title,
  description,
  children,
  downloadContent,
  downloadUrl,
  downloadFilename,
  actionContent,
  actionContentType = 'svg',
  onInsert,
  svgSize,
  svgSizes,
  onSvgSizeChange,
}) => {
  const [open, setOpen] = useState(false);
  const titleId = `component-preview-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const selectedSvgSize = svgSizes?.find((option) => option.id === svgSize);
  const sizeLabelId = `${titleId}-size-label`;

  return (
    <>
      <Tooltip title={`Preview ${title}`} arrow>
        <IconButton
          onClick={() => setOpen(true)}
          aria-label={`Preview ${title}`}
          size='small'
          sx={{
            width: 36,
            height: 36,
            color: 'primary.contrastText',
            bgcolor: 'primary.main',
            borderRadius: 'var(--ms-radius-lg)',
            '&:hover': { bgcolor: 'primary.dark' },
          }}>
          <VisibilityOutlinedIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='lg'
        fullWidth
        aria-labelledby={titleId}>
        <DialogTitle
          id={titleId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            pr: 1.5,
          }}>
          <Typography
            variant='h6'
            component='span'
            fontWeight={700}
            sx={{
              minWidth: 0,
              flex: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}>
            {title} preview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            {(actionContent || downloadContent) && (
              <DualActionButton
                content={actionContent || downloadContent}
                contentType={actionContentType}
                onInsert={onInsert}
                variant='icon-only'
                size='small'
              />
            )}
            {(downloadContent || downloadUrl) && (
              <SvgDownloadButton
                content={downloadContent}
                url={downloadUrl}
                filename={downloadFilename}
              />
            )}
            <IconButton
              onClick={() => setOpen(false)}
              aria-label='Close preview'
              size='small'>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                md: 'minmax(0, 1fr) minmax(240px, 0.34fr)',
              },
              gap: { xs: 2.5, md: 3 },
              alignItems: 'start',
            }}>
            <Box sx={{ minWidth: 0 }}>
              {selectedSvgSize && onSvgSizeChange && (
                <FormControl size='small' sx={{ width: 190, mb: 1.5 }}>
                  <InputLabel id={sizeLabelId}>SVG size</InputLabel>
                  <Select
                    labelId={sizeLabelId}
                    value={svgSize}
                    label='SVG size'
                    onChange={(event) => onSvgSizeChange(event.target.value)}>
                    {svgSizes.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Box
                sx={{
                  minWidth: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--ms-radius-xl)',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                  '& img': { display: 'block', width: '100%', height: 'auto' },
                  '& svg': { display: 'block', width: '100%', height: 'auto' },
                }}>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: selectedSvgSize
                      ? `${selectedSvgSize.width}px`
                      : '100%',
                    mx: 'auto',
                    '& > svg, & > img': { display: 'block', width: '100%' },
                  }}>
                  {children}
                </Box>
              </Box>
            </Box>
            <Box
              component='aside'
              sx={{
                minWidth: 0,
                pt: { xs: 0, md: 0.5 },
                pl: { xs: 0, md: 2.5 },
                borderLeft: { xs: 0, md: '1px solid' },
                borderColor: 'divider',
              }}>
              <Typography
                variant='overline'
                color='text.secondary'
                fontWeight={700}
                letterSpacing={1}>
                About this component
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                {description}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
                Use the actions above to copy, insert, or download this
                component.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

ComponentPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  downloadContent: PropTypes.string,
  downloadUrl: PropTypes.string,
  downloadFilename: PropTypes.string,
  actionContent: PropTypes.string,
  actionContentType: PropTypes.oneOf(['text', 'markdown', 'svg', 'url']),
  onInsert: PropTypes.func,
  svgSize: PropTypes.string,
  svgSizes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })
  ),
  onSvgSizeChange: PropTypes.func,
};

export default ComponentPreview;
