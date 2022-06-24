import React from "react"
export default function ImagePicker({onSubmit, onSelect}) {
    const [imagesPreview, setImagesPreviews] = React.useState([])

    const handleChange = (files) => {
        onSelect(files);
        createPreviewImage(files);
    }

    const handleSubmit= () => {
      onSubmit()
      setImagesPreviews([]);
    }

    const createPreviewImage = (files) =>
    {
        const imageUrls = []
        for (const file of files) {
            imageUrls.push(URL.createObjectURL(file))
        }
        setImagesPreviews(imageUrls)
    }

    return (
    <section class="overflow-hidden text-gray-700">
       <div class="container py-2 mx-auto pt-12 lg:pt-24 lg:px-32 flex flex-row align-middle justify-center ">
          <input id="images" class="hidden" type="file" multiple accept="image/png, image/gif, image/jpeg" onChange={ (e) => handleChange(e.target.files) } />
          <label for="images" class="w-1/2 inline-block mx-2 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs text-center leading-tight uppercase rounded shadow-md">Select Images</label>

          <button type="button" class="w-1/3 mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleSubmit}>Upload</button>
      </div>

      <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
        {imagesPreview?.slice(0,1).map(image => {return (
                  <div class="relative object-center">
                    <img class="max-h-96 hover:scale-110 block object-contain object-center w-full rounded-lg" src={image} />
                  </div>
                )})}

            <div class="flex flex-wrap -m-1 md:-m-2">
                {imagesPreview?.slice(1).map(image => {return (
                  <div class="relative object-center mx-auto w-24">
                    <img class="max-h-24 hover:scale-110 block object-cover object-center w-full h-full rounded-lg" src={image} />
                  </div>
                )}
            )}
            </div>
        </div>


        </section>
    ) // end return
} // end ImagePicker
