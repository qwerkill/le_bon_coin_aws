import { Box, Grid,Modal,Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../src/services/post.service";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const SinglePost = ({param}) => {
    const [onePost, setOnePost] = useState([]);
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [curentIndex, setCurentIndex] = useState(0);


    useEffect (() => {
        getPost()
    }, [])


    const getPost = () => {
        PostService.getPost(id)
        .then((response) => {
            setOnePost(response)
        })
        .catch((error) => {
            console.log(error);
        })
    }


    


    return (
        <Grid container spacing={2}>
            {onePost.uploadFiles?.length <= 2 && (
                <Grid item xs={12}>
                    <img src={onePost.uploadFiles[0].Location} alt="" style={{width:"100%"}} />
                </Grid>
            )}

            {onePost.uploadFiles?.length >= 3 && (
                <>
                <Grid item xs={12} md={8}>
                    <img src={onePost.uploadFiles[0].Location} alt="" style={{width: "100%"}} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <img src={onePost.uploadFiles[1].Location} alt="" style={{width:"100%"}} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{mt: 2}}>
                                <img src={onePost.uploadFiles[2].Location} alt="" style={{width:"100%"}} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            )}
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={{ 
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: "999",
                height: "100vh",
                width: "100vw",
                backgroundColor:" #ffffff",
                display: "flex",
                webkitBoxPack: "center",
                justifyContent: "center",
                webkitBoxAlign: "center",
                alignItems: "center",
            }}>
                {onePost.uploadFiles?.length >= 1 && (
                    <Box 
                        sx={{
                            position: "relative",
                            height: "80vh",
                            width: "80vw",
                            display: "flex",
                            webkitBoxPack: "center",
                            justifyContent: "center",
                            webkitBoxAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button onClick={() => setCurentIndex(curentIndex - 1)} disabled={curentIndex === 0}><ArrowBackIosIcon/></Button>
                        <Box 
                            sx={{
                                webkitBoxPack: "center",
                                justifyContent: "center",
                                boxSizing: "border-box",
                                webkitTapHighlightColor: "transparent",
                                outline: "0px",
                                border: "0px",
                                margin: "0px",
                                userSelect: "none",
                                verticalAlign: "middle",
                                appearance: "none",
                                textDecoration: "none",
                                lineHeight: "1.75",
                                minWidth: "64px",
                                borderRadius: "35px",
                                padding: "12px 24px",
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease 0s",
                                display: "flex",
                                webkitBoxAlign: "center",
                                alignItems: "center",
                                textTransform: "none",
                                fontWeight: "normal",
                            }}
                        >
                        <Button onClick={handleClose} >Close</Button>
                        </Box>
                        <img src={onePost.uploadFiles[curentIndex].Location} alt="" style={{maxWidth: "100%"}} />
                    
                        <Button onClick={() => setCurentIndex(curentIndex + 1)} disabled={curentIndex === onePost.uploadFiles.length - 1}><ArrowForwardIosIcon/></Button>
                   
                    </Box>
                )}
            </Box>
        </Modal>
            <Grid item xs={12} md={6}>
                <h2>{onePost.title}</h2>
                <p>{onePost.content}</p>
            </Grid>
        </Grid>
    );
}

export default SinglePost;