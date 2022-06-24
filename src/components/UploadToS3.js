import React from "react";
import { Storage } from "aws-amplify";
import loadImage from "blueimp-load-image";
import { Auth } from "aws-amplify";

export default async function uploadToS3(images) {
    const user = await Auth.currentAuthenticatedUser();
    // await getMetadata(images[0])
    for (let image of images){
        await Storage.put(user.attributes.email + '/' + image.name, image)
    }
    return
}

    async function getMetadata(file) {
       return await loadImage.parseMetaData(file, (data) => {
            if(data.exif){
             console.log(data.exif);
            } else {
                console.log("No metadata");
            }
            return data.exif;
          })
        }
