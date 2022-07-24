import {useState, useEffect} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Photo from './Photo';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const photoapi = "https://api.jaydnserrano.com/photos";
const sectionapi = "https://api.jaydnserrano.com/sections";
const UploadManager = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sections, setSections] = useState([]);
    const getSections = async () => {
        const res = await axios.get(sectionapi);
        const data = res.data;
        if(data.success && data.sections.length > 0) {
            // set sections to data.response (an array of strings) plus a new section named 'other'
            setSections(data.sections.concat(['other']));
        }
        else if(data.success && data.sections.length === 0) {
            setSections(['other']);
        }
        else {
            setError(data.sections);
        }
    }
    const onDrop = (acceptedFiles) => {
        setLoading(true);
        setError(null);
        // Verify that the files are images
        const images = acceptedFiles.filter(file => file.type.includes('image'));
        // If there are no images, return
        if (images.length === 0) {
            setLoading(false);
            return;
        }
        // Shorten the name of the images to the first 20 characters, replace spaces with underscores, and keep the extension, then store the images in an array
        const photos = images.map(image => {
            const splitname = image.name.split('.');
            const name = splitname[0].substring(0, 20).replace(/\s/g, '_');
            return {
                name: name,
                file: image,
                section: 'other',
                extension: splitname[1],
                src: URL.createObjectURL(image)
                
            };
        }
        );
        // Filter out the images that are already in uploadedPhotos by comparing file content but not name
        const newPhotos = photos.filter(photo => {
            const existingPhotos = uploadedPhotos.filter(existingPhoto => existingPhoto.file.size === photo.file.size && existingPhoto.file.lastModified === photo.file.lastModified);
            return existingPhotos.length === 0;
        }
        );
        // If there are no new images, return but set error
        if (newPhotos.length === 0) {
            setLoading(false);
            setError(String(photos.length - newPhotos.length) + " duplicate images ignored.");
            return;
        }
        // If old images were found
        if (newPhotos.length < photos.length) {
            setError(String(photos.length - newPhotos.length) + " duplicate images ignored.");
        }
        // Add the images waiting to be uploaded to uploadedPhotos
        setUploadedPhotos(uploadedPhotos.concat(newPhotos));
        setLoading(false);
    }
    const onDelete = (photo) => {
        const newPhotos = uploadedPhotos.filter(existingPhoto => existingPhoto.src !== photo.src);
        setUploadedPhotos(newPhotos);
    }
    const onUpload = () => {
        setLoading(true);
        setError(null);
        // If there are no images to upload, return
        if (uploadedPhotos.length === 0) {
            setLoading(false);
            return;
        }
        // Create a form data object for each object in uploadedPhotos
        const forms = uploadedPhotos.map(photo => {
            const formData = new FormData();
            formData.append('name', photo.name + '.' + photo.extension);
            formData.append('section', photo.section);
            formData.append('file', photo.file);
            return formData;
        }
        // Upload the images to api
        )
        const promises = forms.map(form => {
            return axios.post(photoapi, form);
        }
        );
        Promise.all(promises)
        .then(res => {
            // If all images were uploaded and returned {'response': 'File successfully uploaded', 'success': True}, return and set loading to false and clear uploadedPhotos
            if (res.every(r => r.data.success)) {
                setLoading(false);
                setUploadedPhotos([]);
            }
            // If any images were not uploaded, return a count of the images that were not uploaded and set error, then clear uploadedPhotos
            else {
                const failed = res.filter(r => !r.data.success);
                setError(String(failed.length) + " images failed to upload.");
                setUploadedPhotos([]);
                setLoading(false);

            }
        }
        )
        .catch(err => {
            setError(err);
            setLoading(false);
        }
        );
    }
    useEffect(() => {
        getSections();
    }
    , []);
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center gap-4 p-4 text-white">
            <h1 className="text-3xl font-bold mb-4">Upload Manager</h1>
            {/* Dropzone component to upload photos */}
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()} className="flex flex-col justify-center items-center gap-4 h-fit w-full border-dashed border-2 border-indigo-600 hover:border-indigo-500 hover:border-4 p-16">
                        <input {...getInputProps()} />
                        <p className="text-white text-bold">Drag and drop photos here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
            {/* Loading and Error messages*/}
            {loading && <h2 className='text-white'>Loading...</h2>}
            {error && <h2 className="text-white">{error}</h2>}
            {/* List of photos waiting to be uploaded wrapped in an accordion */}
            <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        
                    >
                        {/* Title of accordion displaying how many photos are in accordion*/}
                        <Typography className="text-white text-bold" variant="h6">{uploadedPhotos.length} photos</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        >                            
                        <div className="flex flex-col justify-center items-center gap-4">
                            {!loading && uploadedPhotos.map(photo => (
                                <Photo key={photo.name} photo={photo} onDelete={onDelete} sections={sections}/>
                            ))}
                        </div>
                    </AccordionDetails>
            </Accordion>
            {/* Upload Button */}
            <button className="bg-blue-500 p-2 rounded-lg w-full hover:bg-blue-700" onClick={onUpload}>Upload</button>
        </div>
    );
}
export default UploadManager;