import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({label, values, val, setVal}) => {

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: 'fit-content' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label={label}
          onChange={handleChange}
        >
            {values.map((value, index) => {
                return (
                    <MenuItem key={index} value={index}>{value}</MenuItem>
                )
                })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
