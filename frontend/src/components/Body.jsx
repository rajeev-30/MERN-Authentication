import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import React from 'react'
import Login from "./Login";

function Body() {
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/home",
            element: <Home/>
        },
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Body