import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// components
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };
  const onFinish = (values) => {
    dispatch(logInUser(values.fio, navigate));
    axios
        .post(
            "https://project2-java.herokuapp.com/api/audit/department/api/audit/department/auth/login",
            {
                fio: values.fio,
                password: values.password,
            }
        )
        .then((data) => {
            setToken(data.data.data, values.remember);
            window.location.href = "/";
        })
        .catch((err) => {
            notification["error"]({
                message: "Kirishda xatolik",
                description:
                    "Ism sharifingizni yoki parolni noto'g'ri kiritdingiz.",
                duration: 3,
                icon: <FrownOutlined style={{ color: "#f00" }} />,
            });
            setLoading(false);
            console.error(err);
            navigate("/login");
        });
};
  return (
    <>
    <Box component="form">
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? (<VisibilityOff />) : ( <Visibility />)}
                </IconButton>
              </InputAdornment>
            ),
          }}  
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </Box>
    </>
  );
}
