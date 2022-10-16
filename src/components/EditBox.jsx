import {useEffect, useRef, useState} from 'react';
import {VscFolderOpened} from 'react-icons/vsc';
import BasicSelect from './BasicSelect';
import Box from '@mui/material/Box';
import { Button, FormControl, TextField } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const EditBox = ({ dirent, setEditDirent, onEdit, onDelete }) => {
    const editBoxRef = useRef(null);
    const [name, setName] = useState(dirent.name.split('.')[0]);
    const [extension, setExtension] = useState(dirent.name.split('.')[1]);
    const [parent, setParent] = useState(dirent.parent !== null ? dirent.parent : -1);
    const [dirs, setDirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const onEditSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            alert('Name cannot be empty');
            return;
        }
        if (dirent.isDir === 0 && extension === '') {
            alert('Extension cannot be empty');
            return;
        }
        onEdit({ ...dirent, name: name + (dirent.isDir === 0 ? '.' + extension : ''), parent: parent });
    }
    useEffect(() => {
        setLoading(true);
        if(dirent.isDir === 0) setImgLoading(true);
        const getDirs = async () => {
            const res = await fetch('https://api.jaydnserrano.com/dirents/dirs');
            if(res.status === 200) {
                const data = await res.json();
                setDirs(data.filter((dir) => dir.id !== dirent.id));
            }
            setLoading(false);
        }
        getDirs();
    }, [dirent]);

    return (
    <div ref={editBoxRef} className='fixed z-50 w-screen h-screen top-0 left-0 right-0 bottom-0 p-4 flex justify-center items-center backdrop-blur-2xl text-white'>
        {!loading ? 
        <div className='relative max-w-screen-2xl w-full h-fit flex flex-col lg:flex-row bg-white bg-opacity-50 p-12 rounded-2xl justify-center items-center gap-8'>
            {/* Close Button */}
            <button className="absolute top-0 right-0 mr-4 mt-4 text-black" onClick={() => {setEditDirent(false);}}>X</button>
            {/* Image */}
            <div className='w-full max-w-screen-sm h-full text-black'>
                {!loading ? 
                <div className='overflow-hidden flex justify-center items-center'>
                    {dirent.isDir === 0 ? <img className={imgLoading ? 'hidden': 'border border-black rounded-xl'} src={dirent.src} alt={dirent.name} onLoad={() => setImgLoading(false)}/> : <VscFolderOpened className='w-full h-full'/>}
                    {imgLoading && <div className='w-full h-full flex justify-center items-center'><AiOutlineLoading3Quarters className='animate-spin text-4xl'/></div>}
                </div> :
                <div className='w-full h-full flex justify-center items-center'><AiOutlineLoading3Quarters className='animate-spin text-4xl'/></div>}
            </div>
            {/* Edit Form */}
            <div className='w-full h-full flex flex-col gap-4'>
                {/* Name */}
                <div className='flex flex-col gap-2'>
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
                </div>
                {/* Extension */}
                {dirent.isDir === 0 && <div className='flex flex-col gap-2'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                disabled={true}
                                id="demo-simple-extension"
                                value={extension}
                                label={'Extension'}
                                onChange={(e) => {
                                    setExtension(e.target.value);
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
                {/* Delete Dirent Button */}
                <Button variant="contained" color="error" onClick={() => {setDeleteConfirmation(true)}}>Delete</Button>
                {deleteConfirmation && <div className='flex flex-col gap-2'>
                    <p>Are you sure you want to delete this {dirent.isDir === 0 ? 'file' : 'directory'}?</p>
                    <div className='flex gap-2'>
                        <Button variant="contained" color="error" onClick={() => {onDelete(dirent); setDeleteConfirmation(false);}}>Yes</Button>
                        <Button variant="contained" color="success" onClick={() => {setDeleteConfirmation(false);}}>No</Button>
                    </div>
                </div>}
                
                {/* Submit Edit */}
                <Button variant="contained" onClick={onEditSubmit} >Submit Edit</Button>
            </div>
        </div> : 
        <div className='w-full h-full flex justify-center items-center'>
            <AiOutlineLoading3Quarters className='animate-spin text-6xl'/>
        </div>
        }
    </div>
    );
}
export default EditBox;