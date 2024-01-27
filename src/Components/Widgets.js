import * as React from 'react';
import {
    Box,
    Card,
    Grid,
    Button,
    Select,
    Avatar,
    MenuItem,
    CardMedia,
    InputLabel,
    Typography,
    FormControl,
    CardContent,
} from '@mui/material';
import { message } from 'antd';
import { useData } from '../Hooks/UseData';
import { useNavigate } from 'react-router-dom';
import SendIcon from "@mui/icons-material/Send";
import instance, { avatarUrl } from '../Api/Axios';
import CommonLoading from './Loading/CommonLoading';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../Actions/UploadActions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const ProfileCardWidget = (props) => {
    const { name, job } = props;
    const dispatch = useDispatch();
    const { userData, getUserData } = useData();
    const [photo, setPhoto] = React.useState("");
    const [preview, setPreview] = React.useState();
    const [background, setBackground] = React.useState("");
    const [previewBackground, setPreviewBackground] = React.useState(null);
    let authData = useSelector((state) => state.authReducer.authData?.data);

    const handleImageChange = (event) => {
        setPhoto(event.target.files[0])
    }

    React.useEffect(() => {
        if (!photo) {
            setPreview(!preview)
            return
        } else {
            const data = new FormData();
            data.append("image", photo);
            try {
                dispatch(uploadImage(authData.id, data));
            } catch (err) {
                console.log(err);
            }
        }
        getUserData(authData?.fio);
        uploadImage()
        console.log(userData?.photoId)
    }, [photo])

    React.useEffect(() => {
        if (!background) {
            setPreviewBackground(undefined)
            return
        }

        const objectUrlBackground = URL.createObjectURL(background)
        setPreviewBackground(objectUrlBackground)

        return () => URL.revokeObjectURL(objectUrlBackground)
    }, [background])

    return (
            <Box sx={{height: '100%',}}>
                <Card sx={{width: '200px', height: '200px', cursor: 'pointer'}} aria-label="upload picture" component="label">
                    <CardMedia component='img' image={previewBackground} height="230" sx={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}} />
                        <input 
                            hidden
                            type="file" 
                            onChange={(e) => {setBackground(e.target.files[0])}} 
                            style={{
                                width: '100%',
                                height: '100%'}} 
                        />
                </Card>
                <CardContent sx={{textAlign: 'center', marginTop: '-70px'}}>
                    <Card sx={{width: 100, height: 100, display: 'inline-block', borderRadius: '50%', cursor: 'pointer'}} aria-label="upload picture" component="label">
                        <Avatar sx={{ width: 100, height: 100 }} alt="profile image" src={preview && avatarUrl(userData?.photoId)} />
                        <input hidden type="file" name='profileImage' onChange={handleImageChange} />
                    </Card>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body2">{job}</Typography>
                </CardContent>
            </Box>
    );
};

export const MailWidjet = (props) => {
    const [file, setFile] = React.useState(null);
    const { filesData, getAllFilesData } = useData();
    const [loading, setLoading] = React.useState(false);
    const [selectData, setSelectData] = React.useState([]);
    const { mailImage, mailTitle, uploadData, selectFile } = props;
    const navigate = useNavigate();
    const handleChange = (event) => {
        setSelectData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            return message.error("Iltimos, fayl tanlang");
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("fileData", file);
        instance
            .post("api/audit/department/attachment/upload", { ...formData })
            .then(function (response) {
                message.success("Fayl muvaffaqiyatli qo'shildi");
                getAllFilesData()
                setFile(null)
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Faylni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const downloadSubmit = (event) => {
        event.preventDefault();
        if (!selectData) {
            return message.error("Iltimos, fayl tanlang");
        } 
        setLoading(true);
        instance
            ({
                url: `https://project2-java.herokuapp.com/api/audit/department/attachment/download/${selectData.id}`, 
                method: 'GET',
                responseType: 'blob'
            }
            )
            .then(function (response) {
                const link = document.createElement("a");
                const url = window.URL.createObjectURL(new Blob([response.data]));
                link.href = url;
                link.setAttribute("download", selectData.originalName)
                link.click();
                link.remove();
                message.success("Fayl muvaffaqiyatli yuklandi");
                setSelectData(null);   
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Faylni yuklashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    if (loading) {
        return <CommonLoading />
    }

    return(
        <Grid container spacing={0} sx={{width: {lg: '100%', sm: '100%'}}}>
          <Grid item
          sx={{margin: 'auto', width: {lg: '80%', sm: '100%'}}}
          >
              <Box
                sx={{
                  p: 4,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gap: 2,
                  borderRadius: '10px',
                  backgroundColor: '#4d7d94',
                  boxShadow: '-2px 8px 20px 0px #9e9e9e',
                }}
                component="form"
                onSubmit={uploadData ? handleSubmit : downloadSubmit}
                >
                    <Button size="large" variant='dashed' sx={{
                        border: '2px dashed #fff', 
                        width: "100%", 
                        height: "300px", 
                        display: 'inline-block', 
                        padding: {lg: '30px 60px', xs: '15px 30px'}
                        }} 
                        aria-label="upload picture" 
                        component="label"
                    >
                        <CardMedia
                            component="img"
                            height="100%"
                            width="100%"
                            image={mailImage}
                            alt="mail image"
                            sx={{borderRadius: '15px', objectFit: 'initial'}}
                        />
                        {
                            uploadData ?
                            <input hidden type="file" onChange={(e) => {setFile(e.target.files[0])}} />
                            : null
                        }
                    </Button >
                    <Box sx={{ display: 'flex',
                        justifyContent: "space-between"}} className='mail-form-upload'>
                        {selectFile ? 
                            <FormControl className='mail-form-upload-item' sx={{width: '30%'}}>
                                <InputLabel sx={{color: '#fff'}} id="demo-simple-select-label">
                                    Download files
                                </InputLabel>
                                <Select
                                    label="Download files"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectData?.id}
                                    onChange={handleChange}
                                    required
                                    sx={{color: '#fff', display: 'grid'}}
                                    name="originalName"
                                >
                                    {filesData?.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item}
                                        >
                                            {item.originalName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        : null}
                        {selectFile ? 
                            <Button className='mail-form-upload-item' startIcon={<FileDownloadIcon />} download="How-to-download-file.pdf" onClick={downloadSubmit} size="middle" color="primary" variant='contained'>
                                {mailTitle}
                            </Button> 
                            : 
                            <Button endIcon={<SendIcon />} sx={{marginLeft: 'auto !important'}} className='mail-form-upload-item' onClick={handleSubmit} size="middle" color="primary" variant='contained'>
                                {mailTitle}
                            </Button>
                        }
                    </Box>
              </Box>
          </Grid>
      </Grid>
    )
}
