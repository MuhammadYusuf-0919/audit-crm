// import { Button } from "antd";
// import { Link } from "react-router-dom";
// import rasm from "./404Image.svg";
// import "./error404.css";

// const Error404 = () => {
//     return (
//         <section className="page-not-found">
//             <img src={rasm} alt="404 page" />
//             <h1>Bu Sahifa Topilmadi</h1>
//             <p>
//                 Kechirasiz siz qidirgan sahifa topilmadi!
//                 <Link to="/">Bu yerni boshing</Link> va bosh sahifaga qayting
//             </p>
//             <Button to="/" className="btn-home">
//                 <Link to="/">
//                     <a>Bosh Sahifaga Qaytish</a>
//                 </Link>
//             </Button>
//         </section>
//     );
// };

// export default Error404;

import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { Error404Image } from '../../Assets/Svg/SvgImages';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Error404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Typography>

          <Box
            component="img"
            src={Error404Image}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

