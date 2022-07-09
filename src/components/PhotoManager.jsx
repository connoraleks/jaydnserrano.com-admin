import {useState, useEffect} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
const PhotoManager = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        axios('http://api.jaydnserrano.com/photos')
            .then(res => {
                console.log(res.data['photos']);
                const photosArray = res.data['photos'].map(photo => {
                    return photo.PhotoID;
                });
                console.log(photosArray);
                setPhotos(photosArray);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            })
    }, []);
    return (
        <div id='PhotoManager' className="flex items-center justify-center p-4">
            <div className="flex flex-col justify-center">
                <h1 className="text-white text-2xl">Photo Manager</h1>
                <p className="text-indigo-200 text-lg">Photo Manager is a photo management application that allows you to upload and manage photos.</p>
                {loading && <p className="text-white text-lg">Loading...</p>}
                {error && <p className="text-white text-lg">Error: {error.message}</p>}
                {!loading && !error &&
                <div className='py-4 text-white'>
                    <Dropzone onDrop={acceptedFiles => setUploadedPhotos(uploadedPhotos.concat(acceptedFiles))}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div className='border border-white bg-indigo-600 rounded-2xl p-4'{...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            <ul>
                                {uploadedPhotos.map(uploadedPhoto => {
                                    return <li key={uploadedPhoto} className="text-white text-lg">{String(uploadedPhoto)}</li>
                                }
                                )}
                            </ul>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    <button className="border border-white bg-indigo-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mb-4">
                        Add Photo
                    </button>
                    <p className="text-white text-lg">{photos.length} Photos:</p>
                    <ul className="border-white rounded-2xl p-4">
                        {photos.map(photo => {
                            return <li key={photo} className="text-white text-lg">{photo}</li>
                        }
                        )}
                    </ul>
                </div>
                }
            </div>
        </div>
    );
}
export default PhotoManager;