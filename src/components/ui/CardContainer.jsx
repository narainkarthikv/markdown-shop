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
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        bgcolor: theme.palette.background.paper,
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[3],
          borderColor: `${theme.palette.primary.main}40`,
        },
        '&:focus-visible': {
          outline: `3px solid ${theme.palette.primary.main}33`,
          outlineOffset: '2px',
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
