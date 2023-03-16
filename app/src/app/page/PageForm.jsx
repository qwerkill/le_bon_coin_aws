import { Box, Button, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const PageForm = () => {
    const navigate = useNavigate();
    return ( 
        <Box>
            <Button
                variant="outlined"
                sx={{mb:4}}
                onClick={()=>{navigate("/")}}
            >
                Go back
            </Button>
            <Typography
                variant="h2"
                sx={{
                    mb: 2,
                }}
                >
                    Create a new post
                </Typography>
            <PostForm/>
        </Box>
     );
}
 
export default PageForm;