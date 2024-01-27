import {
    FormControl,
    TextField,
    MenuItem,
    Select,
    Box,
    InputLabel,
    Grid,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { message } from "antd";
import * as React from "react";
import instance from "../../Api/Axios";
import { useSelector } from "react-redux";
import { useData } from "../../Hooks/UseData";
import { useNavigate } from "react-router-dom";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Visibility from "@mui/icons-material/Visibility";
import { ProfileCardWidget } from "../../Components/Widgets";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CommonLoading from "../../Components/Loading/CommonLoading";

const Profile = () => {
    const initialState = {
        id: "",
        fio: "",
        email: "",
        roleId: "",
        photoId: "",
        userName: "",
        phoneNumber: "",
    };
    const { roleData } = useData();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let authData = useSelector((state) => state.authReducer.authData?.data);
    let imagesData = useSelector((state) => state.imagesReducer.imagesData);
    const [profileData, setProfileData] = React.useState({ ...initialState });
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    React.useEffect(() => {
        setProfileData(authData);
    }, [authData]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = {
            ...profileData,
            photoId: imagesData,
        };
        instance
            .put(`api/audit/department/user/${profileData.id}`, { ...data })
            .then((res) => {
                message.success("Xodim muvaffaqiyatli taxrirlandi");
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    if (loading) {
        return <CommonLoading />;
    }

    return (
        <>
            <Box component="main" sx={{ padding: "40px 20px" }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid
                        container
                        sx={{gap: '20px'}}
                        alignItems="center"
                        className="profile_wrapper"
                        justifyContent="space-between"
                    >
                        <Grid
                            item
                            lg={4}
                            xs={12}
                            sx={{
                                marginTop: {md:"5%"},
                                height: "400px",
                                background: " #fff",
                                borderRadius: "15px",
                                paddingTop: "0 !important",
                                boxShadow: "0 5px 20px 0px #9e9e9e",
                            }}
                        >
                            <ProfileCardWidget
                                name={profileData?.fio}
                                job={
                                    profileData?.roleId === 1
                                        ? "Admin"
                                        : profileData?.roleId === 2
                                        ? "Manager"
                                        : "Employe"
                                }
                            />
                        </Grid>
                        <Grid
                            sx={{
                                background: " #fff",
                                borderRadius: "15px",
                                height: "400px",
                                marginTop: {md:"5%"},
                                position: "relative",
                                boxShadow: "0 5px 20px 0px #9e9e9e",
                            }}
                            item
                            lg={7.5}
                            xs={12}
                            className="profile_form_wrapper"
                        >
                            <Grid
                                container
                                sapcing={2}
                                justifyContent="space-around"
                                rowSpacing={4}
                            >
                                <Grid item xs={5}>
                                    <TextField
                                        id="fio"
                                        name="fio"
                                        label="Fio"
                                        type="text"
                                        defaultValue={profileData?.fio}
                                        value={profileData?.fio}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="userName"
                                        name="userName"
                                        label="User Name"
                                        type="text"
                                        defaultValue={profileData?.userName}
                                        value={profileData?.userName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        defaultValue={profileData?.email}
                                        value={profileData?.email}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Roles
                                        </InputLabel>
                                        <Select
                                            name="roleId"
                                            label="Roles"
                                            defaultValue={profileData?.roleId}
                                            value={profileData?.roleId}
                                            onChange={handleChange}
                                        >
                                            {roleData?.map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone number"
                                        type="number"
                                        defaultValue={profileData?.phoneNumber}
                                        value={profileData?.phoneNumber}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                        required
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Password
                                        </InputLabel>
                                        <OutlinedInput
                                            label="Password"
                                            name="password"
                                            value={password}
                                            id="outlined-adornment-password"
                                            onChange={handleChangePassword}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={5}
                                    sx={{
                                        position: "absolute",
                                        bottom: "20px",
                                        right: "30px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        <IconButton
                                            size="middle"
                                            aria-label="show save icon"
                                            color="inherit"
                                        >
                                            <SaveAsIcon />
                                        </IconButton>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
export default Profile;
