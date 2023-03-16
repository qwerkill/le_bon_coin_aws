import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../src/services/post.service";

const SinglePost = ({param}) => {
    const [onePost, setOnePost] = useState([]);
    const {id} = useParams();


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

            <Grid item xs={12} md={6}>
                <h2>{onePost.title}</h2>
                <p>{onePost.content}</p>
            </Grid>
        </Grid>
    );
}

export default SinglePost;