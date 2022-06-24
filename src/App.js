import Amplify from "aws-amplify";
import React, { useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./App.css";

import awsconfig from "./aws-exports";
import ImagePicker from "./components/ImagePicker";
import uploadToS3 from "./components/UploadToS3";
import { ListPhotos } from "./components/ListPhotos";
import ImageGallery from "./components/ImageGallery";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { Storage, Auth } from "aws-amplify"
import { Modal } from "./components/Modal";

Amplify.configure(awsconfig);

function App() {
  const [images, setImages] = React.useState([]);
  const [imageUrls, setImageUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [user, setUser] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState();

  useEffect(() => {
    getImages();
  }, [loading]);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(result => setUser(result))
  }, []);

  const handleChange = (files) => {
    setImages(files);
  }

  const handleModal = (image) => {
    setOpenImage(image)
    setOpen(open ? false : true)
  }

  const upload = async () => {
    setUploading(true);

    await uploadToS3(images)
        .then(setUploading(false))
        .then(setLoading(true))

  }

  async function getImages() {
    let images = await Storage.list("")
    setImages(images)
    images = images.sort((a,b) => b["lastModified"].toString().localeCompare(a.lastModified))

    let urls = await getImagesUri(images)
    setImageUrls(urls);
    setLoading(false);
};

  async function getImagesUri (data) {
    const urls = []
    for (const file of data) {
        urls.push(await Storage.get(file.key))
    }
    return urls
  }


  return (
    <>
      <Navbar />
        {open && <Modal onClose={handleModal} imageURL={openImage} />}
        <ImagePicker onSelect={handleChange} onSubmit={() => upload()}/>
        { uploading ? <Loading /> : <> </>}
        <div class="flex items-center py-4">

        <div class="flex-grow h-px bg-gray-400"></div>


        <span class="flex-shrink text-2xl text-gray-500 px-4 italic font-light">Event Album</span>


        <div class="flex-grow h-px bg-gray-400"></div>

    </div>
        {/* <button onClick={signOut}>Sign Out</button> */}
        <ImageGallery>
          <ListPhotos imageUrls={imageUrls} loading={loading} user={user} onClick={handleModal} />
        </ImageGallery>

    </>
  );
}

export default withAuthenticator(App);
