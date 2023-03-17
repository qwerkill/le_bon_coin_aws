import instance from "./api.service";

const endPoint = "/posts";

const getPosts = async  () => {
    const response = await instance.get(endPoint);
    return response.data
    }

const getPost = async  (id) => {
    const response = await instance.get(`${endPoint}/${id}`);
    return response.data
    }

    const createPost = async (credential) => {
        const headers = { 'Content-Type': 'multipart/form-data' };
        const formData = new FormData();
        formData.append("title", credential.title);
        formData.append("content", credential.content);
        formData.append("formatted_address",credential.formatted_address)   
        formData.append("city", credential.city);
        formData.append("postal_code", credential.postal_code);
        formData.append("country", credential.country);
        formData.append("lng", credential.lng);  
        formData.append("lat", credential.lat);   
       
        if (credential.uploadFiles && credential.uploadFiles.length > 0) {
            credential.uploadFiles.forEach((file) => {
                formData.append("photo", file);
            });
        }
        
        const response = await instance.post(endPoint, formData,{headers});
        return response.data;
    };
    

      

const updatePost = async  (id, data) => {
    return instance.put(`${endPoint}/${id}`, data);
    }

const deletePost = async  (id) => {
    const response = await instance.delete(`${endPoint}/${id}`);
    return response.data 
}
const searchPosts = async (searchTerm) => {
    const response = await instance.get(`${endPoint}?search=${searchTerm}`);
    return response.data;
  }
  


const PostService = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    searchPosts
    };

export default PostService;
