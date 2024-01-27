import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    notification,
    Row,
} from "antd";
import "./Login.css";
import { useEffect, useState } from "react";
import LoadingComp from "../../Components/Loading/Loading1";
import useToken from "../../Hooks/UseToken";
import { useNavigate } from "react-router-dom";
import { FrownOutlined, StepForwardFilled } from "@ant-design/icons";
import axios from "axios";
import { logInUser } from "../../Actions/AuthActions";
import { useDispatch } from "react-redux";

const Login = () => {
    const [loading, setLoading] = useState(true);
    const [kurs, setKurs] = useState([
        {
            id: 69,
            Code: "840",
            Ccy: "USD",
            CcyNm_RU: "Доллар США",
            CcyNm_UZ: "AQSH dollari",
            CcyNm_UZC: "АҚШ доллари",
            CcyNm_EN: "US Dollar",
            Nominal: "1",
            Rate: "11230.39",
            Diff: "7.78",
            Date: "25.11.2022",
        },
        {
            id: 21,
            Code: "978",
            Ccy: "EUR",
            CcyNm_RU: "Евро",
            CcyNm_UZ: "EVRO",
            CcyNm_UZC: "EВРО",
            CcyNm_EN: "Euro",
            Nominal: "1",
            Rate: "11700.94",
            Diff: "113.6",
            Date: "25.11.2022",
        },
        {
            id: 57,
            Code: "643",
            Ccy: "RUB",
            CcyNm_RU: "Российский рубль",
            CcyNm_UZ: "Rossiya rubli",
            CcyNm_UZC: "Россия рубли",
            CcyNm_EN: "Russian Ruble",
            Nominal: "1",
            Rate: "186.04",
            Diff: "0.65",
            Date: "25.11.2022",
        },
    ]);
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const getKurs = () => {
        axios
            .get("https://cbu.uz/uz/arkhiv-kursov-valyut/json")
            .then((data) => {
                const array = [];
                array.push(data.data.data[0]);
                array.push(data.data.data[1]);
                array.push(data.data.data[2]);
                setKurs(array);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const handleChange = () => {};

    useEffect(() => {
        getKurs();
        if (token) {
            navigate("/");
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingComp />;
    }

    return (
        <div className="login">
            <Row
                className="row"
                gutter={16}
                style={{ width: "100%", marginBottom: 30, paddingTop: 30 }}
                justify={"center"}
            >
                <Col xs={8} sm={7} md={6} lg={5} xl={4}>
                    <Card
                        bordered={false}
                        style={{ borderRadius: 10, textAlign: "center" }}
                    >
                        <img
                            src="https://nbu.uz/local/templates/nbu/images/flags/USD.png"
                            alt="usd"
                            style={{ marginRight: 5 }}
                        />
                        <span>1 usd / {kurs[0].Rate} so'm</span>
                    </Card>
                </Col>
                <Col xs={8} sm={7} md={6} lg={5} xl={4}>
                    <Card
                        bordered={false}
                        style={{ borderRadius: 10, textAlign: "center" }}
                    >
                        <img
                            src="https://nbu.uz/local/templates/nbu/images/flags/EUR.png"
                            alt="usd"
                            style={{ marginRight: 5 }}
                        />
                        <span>1 eur / {kurs[1].Rate} so'm</span>
                    </Card>
                </Col>
                <Col xs={8} sm={7} md={6} lg={5} xl={4}>
                    <Card
                        bordered={false}
                        style={{ borderRadius: 10, textAlign: "center" }}
                    >
                        <img
                            src="https://nbu.uz/local/templates/nbu/images/flags/RUB.png"
                            alt="usd"
                            style={{ marginRight: 5 }}
                        />
                        <span>1 rubl / {kurs[2].Rate} so'm</span>
                    </Card>
                </Col>
            </Row>
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <div style={{ marginBottom: "7%" }}>
                            <h1>Ichki Audit Departamenti</h1>
                        </div>
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p className="form-title">Xush kelibsiz</p>
                        <p>O'z sahifangizga kiring</p>
                        <Form.Item
                            name="fio"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Iltimos ism sharifingizmi kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="Ism sharifingizmi kiriting" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos parolingizni kiritig",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Parolingizni kiriting" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Meni eslab qol</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={handleChange}
                            >
                                KIRISH
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;

// import { Helmet } from 'react-helmet-async';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// // hooks
// import useResponsive from '../hooks/useResponsive';
// // components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// // sections
// import { LoginForm } from '../sections/auth/login';

// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <>
//       <Helmet>
//         <title> Login | Minimal UI </title>
//       </Helmet>

//       <StyledRoot>
//         <Logo
//           sx={{
//             position: 'fixed',
//             top: { xs: 16, sm: 24, md: 40 },
//             left: { xs: 16, sm: 24, md: 40 },
//           }}
//         />

//         {mdUp && (
//           <StyledSection>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Hi, Welcome Back
//             </Typography>
//             <img src={} alt="login" />
//           </StyledSection>
//         )}

//         <Container maxWidth="sm">
//           <StyledContent>
//             <Typography variant="h4" gutterBottom>
//               Sign in to Minimal
//             </Typography>

//             <Typography variant="body2" sx={{ mb: 5 }}>
//               Don’t have an account? {''}
//               <Link variant="subtitle2">Get started</Link>
//             </Typography>

//             <Stack direction="row" spacing={2}>
//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
//               </Button>
//             </Stack>

//             <Divider sx={{ my: 3 }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 OR
//               </Typography>
//             </Divider>

//             <LoginForm />
//           </StyledContent>
//         </Container>
//       </StyledRoot>
//     </>
//   );
// }
