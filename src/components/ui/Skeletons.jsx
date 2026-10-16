import { Box, Skeleton, Stack } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * CardSkeleton - Loading state for card components
 */
export const CardSkeleton = ({ height = 200, hasActions = true }) => (
  <Box
    sx={{
      p: 3,
      borderRadius: 'var(--ms-radius-xl)',
      bgcolor: 'background.paper',
      border: (theme) =>
        `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
    }}>
    <Skeleton variant='text' width='60%' height={32} sx={{ mb: 2 }} />
    <Skeleton
      variant='rectangular'
      width='100%'
      height={height}
      sx={{ borderRadius: 'var(--ms-radius-md)', mb: 2 }}
    />
    {hasActions && (
      <Stack direction='row' spacing={1} justifyContent='center'>
        <Skeleton variant='rounded' width={100} height={36} />
        <Skeleton variant='rounded' width={80} height={36} />
      </Stack>
    )}
  </Box>
);

CardSkeleton.propTypes = {
  height: PropTypes.number,
  hasActions: PropTypes.bool,
};

/**
 * IconGridSkeleton - Loading state for icon grid
 */
export const IconGridSkeleton = ({ count = 12 }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
      gap: 2,
      p: 2,
    }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}>
        <Skeleton variant='circular' width={48} height={48} />
        <Skeleton variant='text' width={60} height={16} />
      </Box>
    ))}
  </Box>
);

IconGridSkeleton.propTypes = {
  count: PropTypes.number,
};

/**
 * StatsSkeleton - Loading state for GitHub stats
 */
export const StatsSkeleton = () => (
  <Stack
    spacing={2}
    direction={{ xs: 'column', sm: 'row' }}
    alignItems='center'>
    <Skeleton
      variant='rounded'
      width='100%'
      height={180}
      sx={{
        maxWidth: 400,
        borderRadius: 'var(--ms-radius-xl)',
      }}
    />
    <Skeleton
      variant='rounded'
      width='100%'
      height={180}
      sx={{
        maxWidth: 300,
        borderRadius: 'var(--ms-radius-xl)',
      }}
    />
  </Stack>
);

/**
 * ListSkeleton - Loading state for lists
 */
export const ListSkeleton = ({ count = 5, hasAvatar = false }) => (
  <Stack spacing={2}>
    {Array.from({ length: count }).map((_, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderRadius: 'var(--ms-radius-md)',
          bgcolor: 'background.paper',
        }}>
        {hasAvatar && <Skeleton variant='circular' width={40} height={40} />}
        <Box sx={{ flex: 1 }}>
          <Skeleton variant='text' width='80%' height={24} />
          <Skeleton variant='text' width='60%' height={20} />
        </Box>
      </Box>
    ))}
  </Stack>
);

ListSkeleton.propTypes = {
  count: PropTypes.number,
  hasAvatar: PropTypes.bool,
};

/**
 * TextSkeleton - Loading state for text blocks
 */
export const TextSkeleton = ({ lines = 3, width = '100%' }) => (
  <Stack spacing={1}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant='text'
        width={index === lines - 1 ? '70%' : width}
        height={20}
      />
    ))}
  </Stack>
);

TextSkeleton.propTypes = {
  lines: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/**
 * TableSkeleton - Loading state for tables
 */
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Box sx={{ width: '100%' }}>
    {/* Header */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
        p: 2,
        borderBottom: (theme) =>
          `1px solid ${theme.customTokens?.border || theme.palette.divider}`,
      }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant='text' height={24} />
      ))}
    </Box>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box
        key={rowIndex}
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 2,
          p: 2,
          borderBottom: (theme) =>
            `1px solid ${theme.customTokens?.borderSubtle || theme.palette.divider}`,
        }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant='text' height={20} />
        ))}
      </Box>
    ))}
  </Box>
);

TableSkeleton.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};

export default {
  CardSkeleton,
  IconGridSkeleton,
  StatsSkeleton,
  ListSkeleton,
  TextSkeleton,
  TableSkeleton,
};
