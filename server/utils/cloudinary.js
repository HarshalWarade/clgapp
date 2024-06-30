import fs from "fs"

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // successful
        console.log(response)
        console.log("uploaded successfully")
        return response
    } catch (err) {

        // sync because, the deletion is mandatory, proceed further after unlinking.
        fs.unlinkSync(localFilePath)
        console.log(err)
    }

}