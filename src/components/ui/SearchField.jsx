import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const SearchField = ({ value, onChange, placeholder, sx = {}, ...props }) => (
  <TextField
    fullWidth
    size='small'
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    sx={{
      mb: 3,
      '& .MuiOutlinedInput-root': {
        borderRadius: 'var(--ms-radius-xl)',
      },
      ...sx,
    }}
    {...props}
  />
);

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};

export default SearchField;
