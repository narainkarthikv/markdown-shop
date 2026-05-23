import { Box, Typography, Divider, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * ModernSection Component
 * Creates logical content grouping with clear hierarchy
 * Supports collapsible sections for dense content
 *
 * @example
 * <ModernSection
 *   title="GitHub Statistics"
 *   description="Add dynamic stats to your profile"
 *   collapsible
 * >
 *   {content}
 * </ModernSection>
 */
const ModernSection = ({
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true,
  actions,
  variant = 'default', // 'default' | 'compact' | 'bordered'
  sx,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const isBordered = variant === 'bordered';
  const isCompact = variant === 'compact';

  return (
    <Box
      component='section'
      sx={{
        mb: isCompact ? 4 : 6,
        ...(isBordered && {
          border: (theme) =>
            `1px solid ${theme.customTokens?.border || theme.palette.divider}`,
          borderRadius: 3,
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.shadows[1],
        }),
        ...sx,
      }}
      aria-labelledby={`section-${title?.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Section Header */}
      <Box
        sx={{
          mb: isCompact ? 2 : 3,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}>
        <Box sx={{ flex: 1 }}>
          {title && (
            <Typography
              id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
              variant={isCompact ? 'h6' : 'h5'}
              sx={{
                fontWeight: 600,
                mb: description ? 1 : 0,
                color: (theme) =>
                  theme.customTokens?.textPrimary || theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              {title}
              {collapsible && (
                <IconButton
                  onClick={toggleExpanded}
                  size='small'
                  aria-label={expanded ? 'Collapse section' : 'Expand section'}
                  aria-expanded={expanded}
                  sx={{
                    ml: 1,
                    transition: 'transform 0.2s',
                    transform: expanded ? 'rotate(0deg)' : 'rotate(-180deg)',
                  }}>
                  <ExpandMoreIcon />
                </IconButton>
              )}
            </Typography>
          )}

          {description && (
            <Typography
              variant='body2'
              sx={{
                color: (theme) =>
                  theme.customTokens?.textSecondary ||
                  theme.palette.text.secondary,
                maxWidth: 600,
                lineHeight: 1.6,
              }}>
              {description}
            </Typography>
          )}
        </Box>

        {actions && <Box>{actions}</Box>}
      </Box>

      {/* Divider for non-bordered variants */}
      {!isBordered && (title || description) && (
        <Divider sx={{ mb: isCompact ? 2 : 3 }} />
      )}

      {/* Section Content */}
      {collapsible ? (
        <Collapse in={expanded} timeout='auto'>
          <Box>{children}</Box>
        </Collapse>
      ) : (
        <Box>{children}</Box>
      )}
    </Box>
  );
};

ModernSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  collapsible: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'compact', 'bordered']),
  sx: PropTypes.object,
};

/**
 * SectionGroup - Groups multiple sections with consistent spacing
 */
export const SectionGroup = ({ children, spacing = 6, sx }) => (
  <Box
    sx={{
      '& > section': {
        mb: spacing,
      },
      '& > section:last-child': {
        mb: 0,
      },
      ...sx,
    }}>
    {children}
  </Box>
);

SectionGroup.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  sx: PropTypes.object,
};

/**
 * SectionHeader - Standalone section header
 */
export const SectionHeader = ({ title, subtitle, level = 2, actions, sx }) => {
  const variantMap = {
    1: 'h4',
    2: 'h5',
    3: 'h6',
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        ...sx,
      }}>
      <Box>
        <Typography
          variant={variantMap[level]}
          sx={{
            fontWeight: 600,
            mb: subtitle ? 0.5 : 0,
            color: (theme) =>
              theme.customTokens?.textPrimary || theme.palette.text.primary,
          }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant='body2'
            sx={{
              color: (theme) =>
                theme.customTokens?.textSecondary ||
                theme.palette.text.secondary,
            }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3]),
  actions: PropTypes.node,
  sx: PropTypes.object,
};

export default ModernSection;
