import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { logger } from '@utils/index';
import { ENV } from '@config/index';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    logger.error('Error caught by ErrorBoundary:', error, errorInfo);

    this.setState((prevState) => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // In production, you could send error to a reporting service
    // Example: Sentry, LogRocket, etc.
    if (ENV.isProduction) {
      // sendToErrorReportingService(error, errorInfo);
    }
  }

  handleRefresh = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
            bgcolor: 'background.default',
          }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              width: '100%',
              textAlign: 'center',
              borderRadius: 'var(--ms-radius-xl)',
            }}>
            <ErrorOutlineIcon
              color='error'
              sx={{ fontSize: 64, mb: 2 }}
              aria-label='Error icon'
            />

            <Typography variant='h4' gutterBottom fontWeight={600}>
              Oops! Something went wrong
            </Typography>

            <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
              We&apos;re sorry for the inconvenience. You can try refreshing the
              page or return to the homepage.
            </Typography>

            {/* Show error details in development mode */}
            {ENV.isDevelopment && this.state.error && (
              <Box
                sx={{
                  my: 2,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 'var(--ms-radius-md)',
                  textAlign: 'left',
                  overflowX: 'auto',
                  maxHeight: 200,
                }}>
                <Typography
                  variant='caption'
                  component='div'
                  sx={{ mb: 1, fontWeight: 600 }}>
                  Error Details (Development Only):
                </Typography>
                <Typography
                  variant='body2'
                  component='pre'
                  sx={{
                    color: 'error.main',
                    fontSize: '0.75rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <Box component='span' sx={{ display: 'block', mt: 1 }}>
                      {this.state.errorInfo.componentStack}
                    </Box>
                  )}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleRefresh}
                startIcon={<RefreshIcon />}
                aria-label='Refresh page'>
                Refresh Page
              </Button>
              <Button
                variant='outlined'
                color='primary'
                href='/'
                startIcon={<HomeIcon />}
                aria-label='Go to homepage'>
                Go to Homepage
              </Button>
            </Box>

            {this.state.errorCount > 1 && (
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ mt: 2, display: 'block' }}>
                Error occurred {this.state.errorCount} times
              </Typography>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ErrorBoundary };
export default ErrorBoundary;
