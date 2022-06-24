import React, {useEffect} from "react";
import QRCode from 'react-qr-code'

export default function QRCodeGenerator({qrText, onClick}) {
    const [qrUrl, setQRUrl] = React.useState("");

    useEffect(() => {
        setQRUrl(window.location.href);
        console.log(window.location.href)
      }, [window]);

    return ( <>
            <button>
                <QRCode size={50} value={qrUrl} onClick={onClick}/>
            </button>
        </>
     )
}