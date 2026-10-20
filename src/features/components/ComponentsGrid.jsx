import { Box } from '@mui/material';
import Icons from './Icons';

const ComponentsGrid = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      mb: 0,
    }}>
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
      }}>
      <Icons />
    </Box>
  </Box>
);

ComponentsGrid.displayName = 'ComponentsGrid';

export default ComponentsGrid;
