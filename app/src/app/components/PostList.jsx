import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../src/services/post.service";


const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        getPosts()
    }, [])
    
    const getPosts = () => {
        PostService.getPosts()
        .then((response) => {
            setPosts(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
      
    console.log(posts); 
   

    return ( 
        <Box>
            {posts.map((post) => {
                return (
                        <Card
                        variant="outlined"
                        key={post} 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                            mb: 2,
                            ".MuiCard-root": {
                                mb: 2,
                            },
                        }}
                        onClick={() => { navigate(`/posts/${post._id}`) }}
                        >
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <img src={post.uploadFiles[0]?.Location} alt="" />
                        </Card>
                )
            })}

        </Box>
     );
}
 
export default PostList;