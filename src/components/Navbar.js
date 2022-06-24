import { Auth } from "aws-amplify";
import React from "react";

export default function Navbar({children, }){
   const onLogout = () => {
        Auth.signOut();
        window.location.reload();
    }

    return (
        <nav class="
        relative
        w-full
        flex flex-wrap
        items-center
        justify-between
        py-4
        bg-gray-100
        text-gray-500
        hover:text-gray-700
        focus:text-gray-700
        shadow-lg
        navbar navbar-expand-lg navbar-light
        ">
        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <p>TJ</p>
                <p>Event Upload</p>
                <a><p onClick={() => onLogout()}>Logout</p></a>
        </div>
        </nav>
    )
}