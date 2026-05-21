import axios from "axios";

export const baseURLL="http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: baseURLL,
    withCredentials: true, // Enable sending cookies with every request
})

// Add interceptor to include token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const generateResume=async(description)=>{

    const response=await axiosInstance.post("/api/v1/resume/generate",{
        userDescription:description
    })

    return response.data;
}

export const saveResume = async (resumeData) => {
    const response = await axiosInstance.post("/api/v1/resume/save", resumeData);
    return response.data;
}

export const listSavedResumes = async () => {
    const response = await axiosInstance.get("/api/v1/resume/list");
    return response.data;
}

export const getResumeById = async (id) => {
    const response = await axiosInstance.get(`/api/v1/resume/${id}`);
    return response.data;
}