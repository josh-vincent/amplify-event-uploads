import { Auth } from "aws-amplify";
import React from "react";
import QRCodeGenerator from "./QRCodeGenerator";

export default function Navbar({children, handleQRCodeModal }){
   const onLogout = async () => {
        await Auth.signOut();
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
        <div class="container-fluid w-full flex flex-wrap items-center align-middle justify-between px-6">
                <QRCodeGenerator onClick={handleQRCodeModal} />
                <p>Event Upload</p>
                <button>
                    <p onClick={() => onLogout()}>Logout</p>
                </button>
        </div>
        </nav>
    )
}