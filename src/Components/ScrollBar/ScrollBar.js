import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);

// Mantis ScrollBar

// import PropTypes from 'prop-types';

// // material-ui
// import { alpha, styled } from '@mui/material/styles';
// import { Box } from '@mui/material';

// // third-party
// import SimpleBar from 'simplebar-react';
// import { BrowserView, MobileView } from 'react-device-detect';

// // root style
// const RootStyle = styled(BrowserView)({
//     flexGrow: 1,
//     height: '100%',
//     overflow: 'hidden'
// });

// // scroll bar wrapper
// const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
//     maxHeight: '100%',
//     '& .simplebar-scrollbar': {
//         '&:before': {
//             backgroundColor: alpha(theme.palette.grey[500], 0.48)
//         },
//         '&.simplebar-visible:before': {
//             opacity: 1
//         }
//     },
//     '& .simplebar-track.simplebar-vertical': {
//         width: 10
//     },
//     '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
//         height: 6
//     },
//     '& .simplebar-mask': {
//         zIndex: 'inherit'
//     }
// }));

// // ==============================|| SIMPLE SCROLL BAR  ||============================== //

// export default function SimpleBarScroll({ children, sx, ...other }) {
//     return (
//         <>
//             <RootStyle>
//                 <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
//                     {children}
//                 </SimpleBarStyle>
//             </RootStyle>
//             <MobileView>
//                 <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
//                     {children}
//                 </Box>
//             </MobileView>
//         </>
//     );
// }

// SimpleBarScroll.propTypes = {
//     children: PropTypes.node,
//     sx: PropTypes.object
// };
