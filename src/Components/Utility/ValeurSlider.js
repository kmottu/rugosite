import Slider, { SliderThumb } from '@mui/material/Slider';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


const ValeurSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function ValeurThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

ValeurThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function ValeurComponent(props) {
  return (
    <ValeurSlider
      valueLabelDisplay="auto"
      components={{ Thumb: ValeurThumbComponent }}
      getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      defaultValue={[10, 40]}
      onChange={(e, v) => props.setValeurFilter(v)}
      max={props.max + props.max*0.2}
    />
  )
}