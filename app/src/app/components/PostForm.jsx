import { Box, Button, Grid, Icon, Step, StepButton, Stepper, StepLabel, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import PostService from '../../src/services/post.service';
import GoogleAutocomplet from './GoogleAutocomplet';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const PostForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [credential, setCredential] = useState({});
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = [...files];
        acceptedFiles.forEach((file) => {
            newFiles.push(Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
        });
        setFiles(newFiles);

        setCredential({
            ...credential,
            uploadFiles: newFiles,
        });
    }, [credential, files]);

    useEffect(() => {
        if (credential) console.log("credential", credential);
    }, [credential]);

    useEffect(() => {
        if (files) console.log("files", files);
    }, [files]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        preventDropOnDocument: (event) => {
            event.preventDefault();
        }
    });

    const createPost = () => {
        PostService.createPost(credential)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredential({ ...credential, [name]: value });
    };

    const handleDelete = (index, e) => {
        e.stopPropagation();
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const steps = ['Post information', 'Upload images'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (e) => {
      e.stopPropagation();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getTitleAndLocationStep = () => (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                ".MuiInputBase-root,.MuiButton-root": {
                    mb: 2,
                },
            }}
            onSubmit={handleNext}
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
            <GoogleAutocomplet credential={credential} setCredential={setCredential} />
            <Button variant="contained" type="submit">
                Next
          </Button>
        </Box>
    );

    const getImageUploadStep = () => (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Box
        {...getRootProps()}
        sx={{
          width: "100%",
          height: "100%",
          padding: "32px",
          backgroundColor: "#f7f7f7",
          borderRadius: "8px",
          border: "2px dashed #ccc",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "#eaeaea",
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          Drag and drop some files here, or click to select files
          
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box
                
                  sx={{
                    padding: "32px",
                    backgroundColor: "#f7f7f7",
                    borderRadius: "8px",
                    border: "2px dashed #FFA500  ",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#eaeaea",
                    },
                    color : "#FFA500",
                  }}
              >
               <Icon variant="contained" component="label"  >
                <AddAPhotoIcon/>
                </Icon>
                <Typography variant="h6" component="div" gutterBottom>
        Hello
      </Typography>
              </Box>
            </Grid>
        {Array.from({ length: 7 }).map((_, index) => (
        <Grid item xs={3}>
  {files.length > index ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: `url(${files[index].preview})`,
        backgroundSize: "cover",
      }}
    >
      {/* <img
        src={files[index].preview}
        alt="preview"
        style={{ width: "100%", height: "100%", }}
      /> */}
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => handleDelete(index, e)}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        Delete
      </Button>
    </Box>
  ) : (
    <Box                    
    sx={{
              padding: "32px",
              backgroundColor: "#f7f7f7",
              borderRadius: "8px",
              border: "2px dashed #ccc  ",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#eaeaea",
              },
              color : "#ccc",
            }}
        >
        <Icon variant="contained" component="label"  >
          <AddAPhotoIcon/>
          </Icon>
          <Typography variant="h6" component="div" gutterBottom>
        Hello
        </Typography>
        </Box>
          )}
        </Grid>
        ))}
        </Grid>
        </Box>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      </Box> 
     
    );

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return getTitleAndLocationStep();
            case 1:
                return getImageUploadStep();
            default:
                return "Unknown step";
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vh",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {getStepContent(activeStep)}
                </Box>
            </Box>
        </Box>
    );
}

export default PostForm;