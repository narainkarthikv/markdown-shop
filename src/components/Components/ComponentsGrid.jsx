import { Box } from '@mui/material';
import Icons from '../Icons';

const ComponentsGrid = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      mb: 3,
    }}>
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
      }}>
      <Icons />
    </Box>
  </Box>
);

ComponentsGrid.displayName = 'ComponentsGrid';

export default ComponentsGrid;
