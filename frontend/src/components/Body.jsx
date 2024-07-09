import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import React from 'react'
import Login from "./Login";
import Layout from "./Layout";
import Profile from "./Profile";
import Users from "./Users";
import UpdatePassword from "./UpdatePassword";

function Body() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Layout/>,
            children:[
                {
                    path:"",
                    element:<Home/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/users",
                    element:<Users/>
                },
                {
                    path:"/updatepassword",
                    element:<UpdatePassword/>
                },
                
            ]
        
        },
        {
            path:"/login",
            element:<Login/>
        },
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Body