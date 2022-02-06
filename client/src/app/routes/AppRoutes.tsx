import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRoutes: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    );
};

export default AppRoutes;