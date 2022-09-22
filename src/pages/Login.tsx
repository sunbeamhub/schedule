import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Account } from 'common/components/Account';

function Login() {
  return (
    <Box sx={{ margin: '0 auto', maxWidth: 500 }}>
      <Typography
        align="center"
        gutterBottom
        noWrap
        sx={{ mt: 7 }}
        variant="h4"
      >
        Schedule
      </Typography>
      <Account></Account>
    </Box>
  );
}

export default Login;
