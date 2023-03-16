import { Box, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import PostService from '../../src/services/post.service';
import GoogleAutocomplet from './GoogleAutocomplet';

const PostForm = () => {
    const  [credential, setCredential] = useState({})
    const  navigate = useNavigate();
    
    const onDrop = useCallback((acceptedFiles) => {
        const files = [...acceptedFiles];
        const fileUrls = [];
        const filePreviews = [];
    
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              fileUrls.push(reader.result);
              filePreviews.push(<img src={reader.result} alt="Preview" />);
              if (fileUrls.length === files.length) {
                setCredential({
                  ...credential,
                  uploadFiles: files,
                  imagePreviewUrls: fileUrls,
                  imagePreviews: filePreviews,
                });
              }
            };
        });
    }, [credential]);

    console.log(credential);
          

      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        preventDropOnDocument: (event) => {
          event.preventDefault();
        }
      });
   
    const createPost =  () => {
        PostService.createPost(credential)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        navigate("/")
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredential({...credential, [name]: value})
    }

    const handleDelete = (index,e) => {
        const newImagePreviewUrls = credential.imagePreviewUrls.filter(
            (url, i) => i !== index
        );
        const newImagePreviews = credential.imagePreviews.filter(
            (preview, i) => i !== index
        );
        const newUploadFiles = credential.uploadFiles.filter(
            (file, i) => i !== index
        );
        setCredential({
            ...credential,
            uploadFiles: newUploadFiles,
            imagePreviewUrls: newImagePreviewUrls,
            imagePreviews: newImagePreviews,
        });
    };




    return (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            ".MuiInputBase-root,.MuiButton-root": {
              mb: 2,
            },
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            onChange={handleChange}
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            name="content"
            onChange={handleChange}
          />
          <GoogleAutocomplet credential={credential} setCredential={setCredential}/>
          <Box
            {...getRootProps()}
            sx={{
              padding: "32px",
              backgroundColor: "#f7f7f7",
              borderRadius: "8px",
              border: "2px dashed #ccc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#eaeaea",
              },
            }}
          >
            <input {...getInputProps()} />
            <Box
              component="p"
              sx={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#666",
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </Box>
          </Box>
          {credential.imagePreviews &&
    credential.imagePreviews.map((preview, index) => (
        <div key={index}
        onClick={() => {handleDelete(index)}}
            >
            {preview}
        </div>
    ))
}


          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      );
      
}
 
export default PostForm;