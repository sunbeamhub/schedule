import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import { delay } from 'common/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    right: '14px',
    '& button': {
      margin: 'unset',
      padding: 'unset',
    },
  },
}));

function Account() {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { t } = useTranslation('login');

  return (
    <Box sx={{ pl: 2, pr: 2 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoginLoading(true);
          delay()
            .then(() => {
              setLoginLoading(false);
              navigate('/');
            })
            .catch(() => {
              setLoginLoading(false);
            });
        }}
      >
        <FormControl fullWidth required sx={{ mb: 2 }} variant="standard">
          <InputLabel
            aria-describedby="account-description"
            htmlFor="username"
            shrink
          >
            {t('account')}
          </InputLabel>
          <CustomInput
            autoComplete="username"
            disabled={loginLoading}
            fullWidth
            id="username"
          />
          <FormHelperText id="account-description">
            {t('accountDescription')}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }} variant="standard">
          <InputLabel htmlFor="current-password" shrink>
            {t('password')}
          </InputLabel>
          <CustomInput
            aria-describedby="password-description"
            autoComplete="current-password"
            disabled={loginLoading}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={t('passwordVisibilityDescription')}
                  edge="end"
                  onClick={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            fullWidth
            id="current-password"
            type={passwordVisibility ? 'text' : 'password'}
          />
          <FormHelperText id="password-description">
            {t('passwordDescription')}
          </FormHelperText>
        </FormControl>
        <Box>
          <LoadingButton
            disableElevation
            fullWidth
            loading={loginLoading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            type="submit"
            variant="contained"
          >
            {t('login')}
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}

export default Account;
