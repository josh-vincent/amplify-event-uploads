import React from "react";

export default function ImageGallery ({children}) {
return (
    <section class="overflow-hidden text-gray-700">
        <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
            <div class="flex flex-wrap -m-1 md:-m-2">
                {children}
            </div>
        </div>
    </section>
    )
}