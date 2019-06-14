import PropTypes from "prop-types";

export const controlPropTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  validate: PropTypes.func,
  formEvent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
