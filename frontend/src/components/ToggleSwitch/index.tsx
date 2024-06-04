import PropTypes from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { withStyles } from "@material-ui/core/styles";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#FF7F50",
    "&$checked": {
      color: "#149918",
    },
    "&$checked + $track": {
      backgroundColor: "#6D459E",
    },
    size: 'small',
  },

  checked: {},
  track: {},
})(Switch);

export default function ToggleSwitch({
  name,
  isChecked,
  onChange,
  labelActive,
  labelInactive,
}) {
  const toggle = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <PurpleSwitch checked={isChecked} onChange={toggle} name={name} size="small" />
      }
      label={isChecked ? labelActive : labelInactive}
    />
  );
}

ToggleSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  labelActive: PropTypes.string.isRequired,
  labelInactive: PropTypes.string.isRequired,
};
