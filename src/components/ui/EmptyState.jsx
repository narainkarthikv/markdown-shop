import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';

/**
 * EmptyState Component
 * Provides helpful guidance when content is unavailable
 *
 * @example
 * <EmptyState
 *   icon={<SearchOffIcon />}
 *   title="No results found"
 *   description="Try adjusting your search"
 *   action={<Button>Clear filters</Button>}
 * />
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
  variant = 'default', // 'default' | 'compact'
}) => {
  const isCompact = variant === 'compact';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: isCompact ? 4 : 8,
        px: 3,
        textAlign: 'center',
        minHeight: isCompact ? 200 : 300,
      }}
      role='status'
      aria-live='polite'>
      {icon && (
        <Box
          sx={{
            mb: 2,
            color: (theme) =>
              theme.customTokens?.textTertiary || theme.palette.text.disabled,
            '& > svg': {
              fontSize: isCompact ? 48 : 64,
              opacity: 0.5,
            },
          }}>
          {icon}
        </Box>
      )}

      <Typography
        variant={isCompact ? 'h6' : 'h5'}
        sx={{
          mb: 1,
          fontWeight: 600,
          color: (theme) =>
            theme.customTokens?.textPrimary || theme.palette.text.primary,
        }}>
        {title}
      </Typography>

      {description && (
        <Typography
          variant='body2'
          sx={{
            mb: 3,
            maxWidth: 400,
            color: (theme) =>
              theme.customTokens?.textSecondary || theme.palette.text.secondary,
            lineHeight: 1.6,
          }}>
          {description}
        </Typography>
      )}

      {action && <Box>{action}</Box>}
    </Box>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'compact']),
};

/**
 * Pre-configured empty state variants
 */

export const NoSearchResults = ({ onClear, searchTerm }) => (
  <EmptyState
    icon={<SearchOffIcon />}
    title='No results found'
    description={
      searchTerm
        ? `No matches for "${searchTerm}". Try different keywords or clear filters.`
        : 'Try adjusting your search criteria'
    }
    action={
      onClear && (
        <Button variant='outlined' onClick={onClear}>
          Clear Search
        </Button>
      )
    }
  />
);

NoSearchResults.propTypes = {
  onClear: PropTypes.func,
  searchTerm: PropTypes.string,
};

export const NoDataAvailable = ({ message, action }) => (
  <EmptyState
    icon={<FolderOpenIcon />}
    title='No data available'
    description={
      message || "There's nothing here yet. Get started by adding some content."
    }
    action={action}
  />
);

NoDataAvailable.propTypes = {
  message: PropTypes.string,
  action: PropTypes.node,
};

export const ErrorState = ({ title, message, onRetry }) => (
  <EmptyState
    icon={<ErrorOutlineIcon />}
    title={title || 'Something went wrong'}
    description={message || 'We encountered an error loading this content.'}
    action={
      onRetry && (
        <Button variant='contained' onClick={onRetry}>
          Try Again
        </Button>
      )
    }
  />
);

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export const EmptySelection = ({ message, onAction, actionLabel }) => (
  <EmptyState
    icon={<AddCircleOutlineIcon />}
    title='Nothing selected'
    description={message || 'Select items to see them here'}
    action={
      onAction && (
        <Button variant='outlined' onClick={onAction}>
          {actionLabel || 'Browse Items'}
        </Button>
      )
    }
    variant='compact'
  />
);

EmptySelection.propTypes = {
  message: PropTypes.string,
  onAction: PropTypes.func,
  actionLabel: PropTypes.string,
};

/**
 * Empty state for icon selection
 */
export const NoIconsSelected = () => (
  <EmptyState
    icon={
      <Box
        sx={{
          fontSize: 48,
          opacity: 0.5,
        }}>
        🎨
      </Box>
    }
    title='No icons selected'
    description='Click on icons from the grid above to add them to your README'
    variant='compact'
  />
);

export default EmptyState;
