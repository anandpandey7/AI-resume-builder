import React, { useEffect }  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { listSavedResumes } from '../api/ResumeService';
import { setSavedResumes } from '../store/resumeSlice';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Root(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            listSavedResumes()
                .then((data) => {
                    dispatch(setSavedResumes(data));
                })
                .catch(err => {
                    console.error("Failed to load saved resumes", err);
                });
        }
    }, [isAuthenticated, dispatch]);

    return (
        <div>
            <Navbar/>
            <Outlet />      
        </div>
    );
}
export default Root;