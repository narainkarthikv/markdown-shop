import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const CardContainer = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--ms-radius-xl)',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        bgcolor: theme.palette.background.paper,
        transition:
          'transform var(--ms-duration-base), box-shadow var(--ms-duration-base), border-color var(--ms-duration-base)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[3],
          borderColor: theme.palette.primary.light,
        },
        '&:focus-visible': {
          outline: 'var(--ms-focus-ring-width) solid var(--ms-color-focus)',
          outlineOffset: 'var(--ms-focus-ring-offset)',
        },
        ...sx,
      }}
      {...props}>
      <Box sx={{ p: 2.5, flex: 1 }}>{children}</Box>
    </Paper>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default CardContainer;
