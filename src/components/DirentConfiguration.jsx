import Modal from '@mui/material/Modal';
import { useState } from 'react';
import BasicSelect from './BasicSelect';
import Dropzone from 'react-dropzone';
import axios from 'axios';
const DirentConfiguration = ({ setTriggerRefresh, newDirent, currentDirent, openModal, setOpenModal}) => {
    const values = ['Photo', 'Directory'];
    const [name, setName] = useState('');
    const [type , setType] = useState(0);
    const [filesToUpload, setFilesToUpload] = useState([]);

    const handleClose = () => {
        setOpenModal(false);
        setName('');
        setType(0);
        setFilesToUpload([]);
        setTriggerRefresh(true);
    };
    const closeButton = (
        <button onClick={handleClose} className="absolute top-0 right-0 m-4">
            X
        </button>
    )
    const onUpload = () => {
        // If photo, upload photos to api.jaydnserrano.com/dirents
        if (type === 0) {
            filesToUpload.forEach(file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', file.name);
                formData.append('type', type);
                formData.append('parent', currentDirent.id);
                axios.post('https://api.jaydnserrano.com/dirents', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    if(res.data.success) {
                        console.log(res);
                        handleClose();
                    }
                    else{
                        alert("Error uploading photo: " + res.data.response);
                    }
                }).catch(err => {
                    alert("FATAL Error uploading photo: " + err);
                });
            });
        }
        // If directory, upload directory to api.jaydnserrano.com/dirents
        else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('parent', currentDirent.id);
            axios.post('https://api.jaydnserrano.com/dirents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if(res.data.success) {
                    console.log(res);
                    handleClose();
                }
                else{
                    alert("Error creating dirent: " + res.data.response);
                }
            }).catch(err => {
                alert("FATAL Error editing dirent: " + err);
            });
        }
    }
    const onEdit = () => {
        const formData = new FormData();
        formData.append('name', name);
        axios.put(`https://api.jaydnserrano.com/dirents/${currentDirent.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if(res.data.success) {
                console.log(res);
                handleClose();
            }
            else {
                alert("Error editing dirent: " + res.data.response);
            }
        }).catch(err => {
            alert('FATAL Error editing dirent:' +err);
        });
    }
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        setFilesToUpload([...filesToUpload, ...acceptedFiles]);
    }
    const onDelete = () => {
        axios.delete(`https://api.jaydnserrano.com/dirents/${currentDirent.id}`)
        .then(res => {
            if(res.data.success) {
                console.log(res);
                handleClose();
            }
            else {
                alert("Error deleting dirent: " + res.data.response);
            }
        })
        .catch(err => {
            alert("FATAL Error deleting dirent: " + err);
        });
        handleClose();
    }
    return (
        <>
        {currentDirent && newDirent && <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* Modal content */}
            <div className="relative flex flex-col bg-white p-4 gap-4">
                {/* Close Button for top right corner */}
                {closeButton}
                {/* Title */}
                <h2 id="modal-modal-title" className="text-2xl font-bold">New Dirent in {currentDirent.name}</h2>
                {/* Prompt */}
                <p id="modal-modal-description" className="text-lg">
                    What type of dirent would you like to create?
                </p>
                {/* Select photo or directory */}
                <BasicSelect label="Type" values={values} val={type} setVal={setType} />
                {/* If photo make a dropzone for uploads 
                    If directory make input for name */}
                {type === 0 ? 
                <div>
                    {/* List of uploaded photos */}
                    <div className="flex flex-col gap-4">
                        {filesToUpload.map((file, index) => (
                            <div key={index} className="flex flex-row gap-4">
                                <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20" />
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* Dropzone for uploading photos */}
                    <Dropzone onDrop={onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()} className="flex flex-col justify-center items-center border-dashed border-2 border-gray-400 hover:border-gray-600 p-16">
                                <input {...getInputProps()} />
                                <p className="text-black text-bold">Drag and drop photos here, or click to select files</p>
                            </div>
                        )}
                    </Dropzone>
                </div> :
                <input type="text" placeholder="Name" className="w-full border-2 border-gray-300 rounded-md p-2 my-2" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                }
                {/* Submit Button */}
                <button className="bg-blue-500 text-white rounded-md p-2 w-fit hover:bg-blue-600" onClick={onUpload}>Create</button>
            </div>
        </Modal>}
        {currentDirent && !newDirent && <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* Editing a dirent */}
            <div className="relative flex flex-col bg-white p-4 gap-4">
                {/* Close Button for top right corner */}
                {closeButton}
                {/* Title */}
                <h2 id="modal-modal-title" className="text-2xl font-bold">Edit Dirent: {currentDirent.name}</h2>
                {/* Prompt */}
                <p id="modal-modal-description" className="text-lg">
                    What would you like to change?
                </p>
                {/* Name */}
                <input type="text" placeholder={currentDirent.name} className="w-full border-2 border-gray-300 rounded-md p-2 my-2" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                {/* Delete button */}
                <button className="bg-red-500 text-white rounded-md p-2 w-fit hover:bg-red-600" onClick={onDelete}>Delete</button>
                {/* Submit Button */}
                <button className="bg-blue-500 text-white rounded-md p-2 w-fit hover:bg-blue-600" onClick={onEdit}>Submit</button>
            </div>
        </Modal>}
        </>
    );
}
export default DirentConfiguration;