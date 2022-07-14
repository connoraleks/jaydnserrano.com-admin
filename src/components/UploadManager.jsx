import {useState, useEffect} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Photo from './Photo';
const api = "http://api.jaydnserrano.com/photos";
const UploadManager = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [section, setSection] = useState('other');
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
                section: section,
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
    const onDelete = (file) => {
        setUploadedPhotos(uploadedPhotos.filter(photo => photo.file !== file));
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
        const formData = uploadedPhotos.map(photo => {
            const formData = new FormData();
            formData.append('name', photo.name + '.' + photo.extension);
            formData.append('section', photo.section);
            formData.append('file', photo.file);
            return formData;
        }
        // Upload the images to api
        )
        formData.forEach(form => {
            axios.post(api, form)       
            // If there are errors, return
            .catch(err => {
                setLoading(false);
                setError(err.response.data.message);
            }
            );
        });
        // Clear the uploadedPhotos array
        setUploadedPhotos([]);
        setLoading(false);
    }
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center gap-4 p-4">
            <div className="flex flex-col justify-center items-center gap-4">
                {/* Input for section name */}
                <div className="flex flex-col justify-center items-center">
                    <input className="bg-white p-2 rounded-lg" type="text" placeholder="Section name" onChange={e => setSection(e.target.value)}/>
                </div>
                {/* Dropzone component to upload photos */}
                <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="flex flex-col justify-center items-center gap-4 h-fit border-dashed border-2 border-indigo-600 hover:border-indigo-700 hover:border-4 p-16">
                            <input {...getInputProps()} />
                            <p>Drag and drop photos here, or click to select files</p>
                        </div>
                    )}
                </Dropzone>
                {/* Upload Button */}
                <button className="bg-blue-500 p-2 rounded-lg" onClick={onUpload}>Upload</button>
            </div>
            {/* Loading and Error messages*/}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* List of photos waiting to be uploaded */}
            <div className="flex flex-col justify-center items-center gap-4">
                {!loading && uploadedPhotos.map(photo => (
                    <Photo key={photo.name} photo={photo} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
}
export default UploadManager;