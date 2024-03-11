import {v2 as clodinary} from 'clodinary';
import fs from 'fs'

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return "File not found..";
        
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log(`File is uploded on coloudinary: ${response.url}`);
       return response;
    }catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temp files as the upload opertion got failed
        
        return "remove the temp file from server"
        
    }
    
}

export {uploadOnCloudinary}