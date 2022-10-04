import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({label, values, val, onChange}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      {values.length > 0 && <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelid="demo-simple-select-label"
          id="demo-simple-select"
          value={values.findIndex((value) => value.id === val)}
          label={label}
          onChange={onChange}
        >
          {values.map((value,index) => {
            return <MenuItem key={index} value={index}>{value.name}</MenuItem>
          })}
        </Select>
      </FormControl>}
    </Box>
  );
}

export default BasicSelect;
