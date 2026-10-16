import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const SvgDownloadButton = ({
  content,
  url,
  filename = 'github-component.svg',
  showLabel = false,
}) => {
  const handleDownload = () => {
    if (url) {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.rel = 'noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return;
    }

    if (!content) return;
    const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const iconButton = (
    <IconButton
      onClick={handleDownload}
      aria-label={`Download ${filename}`}
      size='small'
      sx={{
        width: 36,
        height: 36,
        color: 'primary.contrastText',
        bgcolor: 'primary.main',
        borderRadius: 'var(--ms-radius-lg)',
        '&:hover': { bgcolor: 'primary.dark' },
      }}>
      <DownloadOutlinedIcon fontSize='small' />
    </IconButton>
  );

  if (!showLabel) {
    return (
      <Tooltip title='Download SVG' arrow>
        {iconButton}
      </Tooltip>
    );
  }

  return (
    <Button
      onClick={handleDownload}
      startIcon={<DownloadOutlinedIcon />}
      variant='contained'
      size='small'
      sx={{ mt: 2 }}>
      Download SVG
    </Button>
  );
};

SvgDownloadButton.propTypes = {
  content: PropTypes.string,
  url: PropTypes.string,
  filename: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default SvgDownloadButton;
