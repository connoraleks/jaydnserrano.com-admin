import {useEffect, useRef, useState} from 'react';
import {VscFolderOpened} from 'react-icons/vsc';
import BasicSelect from './BasicSelect';
import Box from '@mui/material/Box';
import Dropzone from 'react-dropzone';
import { FormControl, TextField, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const AddBox = ({ onAdd, setNewDirent }) => {
    const AddBoxRef = useRef(null);
    const [name, setName] = useState('');
    const [parent, setParent] = useState(-1);
    const [type, setType] = useState(0);
    const [dirs, setDirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        const newDirent = {
            name: name,
            parent: parent,
        };
        onAdd(newDirent);
        setNewDirent(null);
    }
    useEffect(() => {
        setLoading(true);
        const getDirs = async () => {
            const res = await fetch('https://api.jaydnserrano.com/dirents/dirs');
            if(res.status === 200) {
                const data = await res.json();
                setDirs(data);
            }
            setLoading(false);
        }
        getDirs();
    }, []);

    return (
    <div ref={AddBoxRef} className='fixed z-50 w-screen h-screen max-h-screen top-0 left-0 right-0 bottom-0 p-4 flex justify-center items-center backdrop-blur-2xl text-white'>
        {!loading ? 
        <div className='relative max-w-screen-2xl w-full h-fit flex flex-col lg:flex-row bg-white bg-opacity-50 p-12 rounded-2xl justify-center items-center gap-8'>
            {/* Close Button */}
            <button className="absolute top-0 right-0 mr-4 mt-4 text-black" onClick={() => {setNewDirent(false);}}>X</button>
            {/* Image */}
            <div className='w-1/3 lg:w-full lg:max-w-screen-sm h-full text-black'>
                {!loading ? 
                <div className='overflow-hidden flex justify-center items-center'>
                    {parent.isDir === 0 ? <img className={imgLoading ? 'hidden': 'border border-black rounded-xl'} src={parent.src} alt={parent.name} onLoad={() => setImgLoading(false)}/> : <VscFolderOpened className='w-full h-full'/>}
                    {imgLoading && <div className='w-full h-full flex justify-center items-center'><AiOutlineLoading3Quarters className='animate-spin text-4xl'/></div>}
                </div> :
                <div className='w-full h-full flex justify-center items-center'><AiOutlineLoading3Quarters className='animate-spin text-4xl'/></div>}
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
                                <ToggleButton value={0} aria-label="left aligned" sx={{width: '50%'}}>
                                    Directory
                                </ToggleButton>
                                <ToggleButton value={1} aria-label="centered" sx={{width: '50%'}}>
                                    Photo
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                    </Box>
                </div>
                {/* Name */}
                {type === 0 && <div className='flex flex-col gap-2'>
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
                {type === 1 && <div className='w-full flex flex-col gap-4'>
                    {/* Display names of files inside a non editable TextField to match the style */}
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                id="demo-simple-name"
                                value={uploadedFiles.map((file) => file.name).join(',')}
                                label={'Uploaded Files'}
                                disabled
                            />
                        </FormControl>
                    </Box>
                    {/* Dropzone */}
                    <Dropzone onDrop={(acceptedFiles) => {
                        acceptedFiles.forEach((file) => {
                            const reader = new FileReader();
                            reader.onabort = () => console.log('file reading was aborted');
                            reader.onerror = () => console.log('file reading has failed');
                            reader.onload = () => {
                                const binaryStr = reader.result;
                                const newFile = {
                                    name: file.name,
                                    src: binaryStr,
                                }
                                setUploadedFiles((prev) => [...prev, newFile]);
                            }
                            reader.readAsDataURL(file);
                        }
                        );
                    }}>
                        {({getRootProps, getInputProps}) => (
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <TextField
                                    id="demo-simple-name"
                                    label={'Drag and Drop Files Here'}
                                    disabled
                                    {...getRootProps()}
                                />
                                <input {...getInputProps()} accept="image/*, directory/*" />
                            </FormControl>
                        </Box>
                        )}

                    </Dropzone>
                </div>}
                {/* Submit Dirent */}
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