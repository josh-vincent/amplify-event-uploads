import React from "react";

export function ListPhotos({imageUrls, loading, user, onClick}) {

    const imagePressed = (image) => {
        onClick(image)
    }

    let startEmail = user?.attributes?.email?.substring(0,8)

    return (loading ? <div>Loading...</div> :
        imageUrls?.map(image => (
            <div class="flex flex-wrap w-1/3 lg:w-1/6 align-middle">
                <div class="w-full p-1 md:p-2 max-h-64 max-w-96">

                <div class="relative object-center align-middle">
                    <img class="h-32 hover:scale-110 block object-cover object-center w-full h-full rounded-lg" src={image} onClick={() => imagePressed(image)} />

                    {image.includes(startEmail) &&
                        <span class="top-0 left-0 absolute  w-3.5 h-3.5 bg-orange-300 border-2 border-white dark:border-gray-800 rounded-full"> </span>
                    }
                  </div>
                </div>
            </div>
        ))
    );
}
