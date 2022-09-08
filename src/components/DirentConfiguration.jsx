import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import BasicSelect from './BasicSelect';
import Dropzone from 'react-dropzone';
import axios from 'axios';
const DirentConfiguration = ({currentDirent, openModal, setOpenModal}) => {
    const values = ['Photo', 'Directory'];
    const [name, setName] = useState('');
    const [type , setType] = useState(0);
    const [files, setFiles] = useState([]);
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        setFiles([...files, ...acceptedFiles]);
    }
    useEffect(() => {
        if (openModal) {
            setType(0);
        }
    }, [openModal]);
    return (
        <>{currentDirent && <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/* Modal content */}
            <div className="relative flex flex-col bg-white p-4 gap-4">
                {/* Close Button for top right corner */}
                <div className="absolute top-0 right-0 m-4">
                    <button onClick={() => setOpenModal(false)}>X</button>
                </div>
                <h2 id="modal-modal-title" className="text-2xl font-bold">New Dirent in {currentDirent.name}</h2>
                <p id="modal-modal-description" className="text-lg">
                    What type of dirent would you like to create?
                </p>
                {/* Select photo or directory */}
                <BasicSelect label="Type" values={values} val={type} setVal={setType} />
                {type === 0 ? 
                <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="flex flex-col justify-center items-center border-dashed border-2 border-gray-400 hover:border-gray-600 p-16">
                            <input {...getInputProps()} />
                            <p className="text-black text-bold">Drag and drop photos here, or click to select files</p>
                        </div>
                    )}
                </Dropzone> : <input type="text" placeholder="Name" className="w-full border-2 border-gray-300 rounded-md p-2 my-2" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                }
                {/* Submit Button */}
                <button className="bg-blue-500 text-white rounded-md p-2 w-fit hover:bg-blue-600" onClick={() => {
                    if (type === 0) {
                        files.forEach(file => {
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
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            });
                        });
                    }
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
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                    setOpenModal(false);
                }}>Create</button>
            </div>
        </Modal>}</>
    );
}
export default DirentConfiguration;