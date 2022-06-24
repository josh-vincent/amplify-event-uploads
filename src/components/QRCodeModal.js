import React, { useEffect } from "react";
import QRCode from 'react-qr-code'

export function QRCodeModal({onClose}) {
  const [qrUrl, setQRUrl] = React.useState("");

  useEffect(() => {
      setQRUrl(window.location.href);
    }, []);

    return (
        <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-12 mx-auto max-w-3xl ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none max-h-screen m-8">
              <div className="relative p-6 flex-auto">
                <button
                  className="bg-transparent border-0 text-black absolute top-0 right-0"
                  onClick={onClose}>
                  <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                    x
                  </span>
                </button>

                <QRCode size={256} value={qrUrl} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
}