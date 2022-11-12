import {useEffect, useRef, useState} from 'react';
import {VscFolderOpened} from 'react-icons/vsc';
import { MdAddAPhoto } from 'react-icons/md';
import BasicSelect from './BasicSelect';
import Box from '@mui/material/Box';
import Dropzone from 'react-dropzone';
import { FormControl, TextField, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AddBox = ({ setNewDirent, setTriggerRefresh }) => {
    const AddBoxRef = useRef(null);
    const [name, setName] = useState('');
    const [parent, setParent] = useState(-1);
    const [type, setType] = useState(1);
    const [dirs, setDirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const onAdd = (dirent) => {
        console.log(dirent);
        if(dirent.isDir === 1) {
            const formData = new FormData();
            formData.append('name', dirent.name);
            formData.append('parent', dirent.parent);
            formData.append('isDir', dirent.isDir);
            formData.append('action', 'add');
            axios.post(`https://api.jaydnserrano.com/dirents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res);
                setTriggerRefresh(true);
            })
            .catch(err => {
                console.log(err);
                if(err.response) {
                    alert(err.response.data.error);
                }
            })
        } else if(dirent.isDir === 0) {
            // For each file, create a new form data and append the file to it so the backend can access it at request.files['file']
            dirent.files.forEach(file => {
                const formData = new FormData();
                formData.append('name', dirent.name);
                formData.append('parent', dirent.parent);
                formData.append('isDir', dirent.isDir);
                formData.append('action', 'add');
                formData.append('file', file);
                console.log('File: ' + file + ' | Name: ' + dirent.name + ' | Parent: ' + dirent.parent + ' | isDir: ' + dirent.isDir);
                // account for cors issues
                axios.post(`https://api.jaydnserrano.com/dirents`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    console.log(res);
                    setTriggerRefresh(true);
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(type === 0 && uploadedFiles.length === 0) {
            alert('Please upload at least one file');
            return;
        }
        if (type === 1 && name === '') {
            alert('Name cannot be empty');
            return;
        }
        onAdd({ name: name, parent: parent, isDir: type, files: uploadedFiles });
        setNewDirent(false);
    }
    useEffect(() => {
        setLoading(true);
        const getDirs = async () => {
            const res = await fetch('https://api.jaydnserrano.com/dirents/dirs');
            if(res.status === 200) {
                const data = await res.json();
                if(type === 0) {
                    let temp = data.filter(dirent => Number(dirent.id) !== -1);
                    setParent(temp[0].id);
                    setDirs(temp);
                } else {
                    setParent(-1);
                    setDirs(data);
                }
            }
            setLoading(false);
        }
        getDirs();
    }, [type]);

    return (
    <div ref={AddBoxRef} className='fixed z-50 w-screen h-screen max-h-screen top-0 left-0 right-0 bottom-0 p-4 flex justify-center items-center backdrop-blur-2xl text-white'>
        {!loading ? 
        <div className='relative max-w-screen-2xl w-full h-fit flex flex-col lg:flex-row bg-white bg-opacity-50 p-12 rounded-2xl justify-center items-center gap-8'>
            {/* Close Button */}
            <button className="absolute top-0 right-0 mr-4 mt-4 text-black" onClick={() => {setNewDirent(false);}}>X</button>
            {/* Image */}
            <div className='w-1/3 lg:w-full lg:max-w-screen-sm h-full text-black'>
                <div className='overflow-hidden flex justify-center items-center'>
                    {type === 1 &&  <VscFolderOpened className='w-full h-full'/>}
                    {type === 0 && <MdAddAPhoto className='w-full h-full'/>}
                </div>
            </div>
            {/* Add Form */}
            <div className='w-full h-full flex flex-col gap-4'>
                {/* Directory or Photo Selector */}
                <div className='w-full'>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <ToggleButtonGroup value={type} exclusive sx={{ width: '100%' }} onChange={(event, newType) => {
                                setUploadedFiles([]);
                                setType(newType);
                            }}>
                                <ToggleButton value={1} aria-label="left aligned" sx={{width: '50%'}}>
                                    Directory
                                </ToggleButton>
                                <ToggleButton value={0} aria-label="centered" sx={{width: '50%'}}>
                                    Photo
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                    </Box>
                </div>
                {/* Name */}
                {type === 1 && <div className='flex flex-col gap-2'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                id="demo-simple-name"
                                value={name}
                                label={'Name'}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Box>
                </div>}
                {/* Parent */}
                <div className='flex flex-col gap-2'>
                    {dirs ? <BasicSelect label={"Parent Directory"} values={dirs} val={parent} onChange={(event) => {
                        setParent(dirs[event.target.value].id);
                    }}/> : <p>Loading...</p>}
                </div>
                {/* drag and drop upload box for photos styled using mui Button */}
                {type === 0 && <div className='w-full flex flex-col gap-4'>
                    {/* Dropzone */}
                    <Dropzone onDrop={(acceptedFiles) => {
                        // remove all files that are not images
                        let temp = acceptedFiles.filter(file => file.type.includes('image'));
                        // remove all files with the same name as the files already uploaded
                        temp = temp.filter(file => !uploadedFiles.some(uploadedFile => uploadedFile.name === file.name));
                        // add the new files to the uploadedFiles array
                        setUploadedFiles([...uploadedFiles, ...temp]);
                    }}>
                        {({getRootProps, getInputProps}) => (
                        <Box sx={{ minWidth: 120 }}>
                            {/* Drag and drop box */}
                            <div {...getRootProps()} className='w-full h-40 flex flex-col justify-center items-center border-2 border-dashed border-[#0000001a] rounded-2xl text-black overflow-hidden'>
                                <input {...getInputProps()} name='file' />
                                <h3 className='text-md font-semibold p-4'>Drag and drop files here</h3>
                                {uploadedFiles.length > 0 && <List sx={{ width: '100%',height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', overflowY: 'scroll',borderTop: '1px solid #0000001a', padding: '0px 8px' }}>
                                    {uploadedFiles.map((file, index) => (
                                        <ListItem 
                                            key={index}
                                            sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={file.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>}
                            </div>
                        </Box>
                        )}

                    </Dropzone>
                </div>}
                {/* Submit Dirent Button */}
                <div className='w-full'>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <Button variant="contained" onClick={onSubmit} sx={{width: '100%', backgroundColor: 'black'}}>
                                Submit
                            </Button>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div> : 
        <div className='w-full h-full flex justify-center items-center'>
            <AiOutlineLoading3Quarters className='animate-spin text-6xl'/>
        </div>
        }
    </div>
    );
}
export default AddBox;