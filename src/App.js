import Amplify, { Storage, Auth } from "aws-amplify";
import React, { useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./App.css";

import awsconfig from "./aws-exports";

import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { Modal } from "./components/Modal";
import uploadToS3 from "./components/UploadToS3";
import ImagePicker from "./components/ImagePicker";
import ImageGallery from "./components/ImageGallery";
import { QRCodeModal } from "./components/QRCodeModal";
import { ListPhotos } from "./components/ListPhotos";

Amplify.configure(awsconfig);

function App() {
  const [images, setImages] = React.useState([]);
  const [imageUrls, setImageUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [user, setUser] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState();
  const [qrCode, setQrCode] = React.useState(false)

  useEffect(() => {
    getImages();
  }, [loading]);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(result => {
      setUser(result)
    })
  }, []);

  const handleChange = (files) => {
    setImages(files);
  }

  const handleModal = (image) => {
    setOpenImage(image)
    setOpen(open ? false : true)
  }

  const handleQRCodeModal = () => {
    setQrCode(qrCode ? false : true)
  }
  const upload = async () => {
    setUploading(true);

    await uploadToS3(images)
        .then(setUploading(false))
        .then(setLoading(true))
        .then(setImages([]))
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
      <Navbar handleQRCodeModal={handleQRCodeModal} />
        {open &&
          <Modal onClose={handleModal}>
              <img alt="event-" class="block object-cover object-center w-full rounded-lg " src={openImage} />
          </Modal>
        }
        {/* QR CODE MODAL */}
        {qrCode &&  <QRCodeModal onClose={handleQRCodeModal} />}
        <ImagePicker onSelect={handleChange} onSubmit={() => upload()}/>

        {/* Loading */}
        { uploading ? <Loading /> : <> </>}
        <div class="flex items-center py-4">
          <div class="flex-grow h-px bg-gray-400"></div>
            <span class="flex-shrink text-2xl text-gray-500 px-4 italic font-light">Event Album</span>
          <div class="flex-grow h-px bg-gray-400"></div>
        </div>

        {/* Photo Album */}
        <ImageGallery>
          <ListPhotos imageUrls={imageUrls} loading={loading} user={user} onClick={handleModal} />
        </ImageGallery>

    </>
  );
}

export default withAuthenticator(App);
