import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BedIcon from '@mui/icons-material/Bed';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LightModeIcon from '@mui/icons-material/LightMode';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function useWorkStatusChip() {
  const workStatusColorMap: { [key: string]: any } = {
    'day-off': 'default',
    dayshift: 'success',
    'halfDay-off': 'warning',
    leave: 'default',
    nightshift: 'primary',
    outpatientClinic: 'secondary',
  };

  const workStatusIconMap: { [key: string]: any } = {
    'day-off': <BedIcon />,
    dayshift: <LightModeIcon />,
    'halfDay-off': <CoffeeIcon />,
    leave: <AccessTimeIcon />,
    nightshift: <BedtimeIcon />,
    outpatientClinic: <LocalHospitalIcon />,
  };

  return { workStatusColorMap, workStatusIconMap };
}

export default useWorkStatusChip;
