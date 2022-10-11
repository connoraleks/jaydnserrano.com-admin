import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import Album from './Album';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import axios from 'axios';
const PhotoManager = ({setNewDirent, setEditDirent, id}) => {
    const [expanded, setExpanded] = useState(false);
    const [dirent, setDirent] = useState(null);
    useEffect(() => {
        const getDirent = async () => {
            const res = await axios.get(`https://api.jaydnserrano.com/dirents/${id}`);
            if(res.status === 200) {
                setDirent(res.data);
            }
        }
        getDirent();
    }, [id]);
    return (
        <div className={dirent ? 'w-full h-full flex flex-col gap-4 p-4' : 'w-full h-full flex justify-center items-center text-white'}>
            {dirent ? (
                <>
                {dirent.dirs.map((dir) => {
                    // dirent.dirs = [{id: 1, name: 'test'}, {id: 2, name: 'test2'}]
                    return (
                        <Accordion key={dir.id} expanded={expanded === dir.id} onChange={() => setExpanded(expanded === dir.id ? false : dir.id)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography className='flex justify-between items-center w-full'>
                                    <span className='flex justify-start items-center text-2xl'>{dir.name}</span>
                                    <button className="border-2 p-2 border-white rounded-full w-8 h-8 flex justify-center items-center" onClick={(event) => {
                                        event.stopPropagation();
                                        setEditDirent(dir);
                                    }}>E</button>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {dir.dirs.length> 0 && <PhotoManager setEditDirent={setEditDirent} id={dir.id}/>}
                                {dir.photos.length > 0 ? <Album photoSet={dir.photos} handleClick={(event, photo, index) => {
                                    event.stopPropagation();
                                    setEditDirent(photo);
                                    }}/> : <p className='p-4'>No photos in this directory</p>}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
                {setNewDirent && <div className='w-full flex justify-center items-center'><button className='border-2 border-white p-2 rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-800' onClick={() => setNewDirent(true)}>+</button></div>}
                </>
            ) : (
                <div className='w-full h-full flex justify-center items-center'>
                    <AiOutlineLoading3Quarters className='animate-spin text-6xl'/>
                </div>)}
        </div>
    );
}

export default PhotoManager;