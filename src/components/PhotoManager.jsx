import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import DirentConfiguration from './DirentConfiguration';
import Album from './Album';
const PhotoManager = ({setTriggerRefresh, galleryRef, directory, sections}) => {
    const [expanded, setExpanded] = useState(false);
    const [openNewDirentModal, setOpenNewDirentModal] = useState(false);
    const [openEditDirentModal, setOpenEditDirentModal] = useState(false);
    const [currentDirent, setCurrentDirent] = useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    const handleClick = (event, dirent, edit=true) => {
        // open link in new tab
        event.stopPropagation();
        console.log(dirent);
        setCurrentDirent(dirent);
        if(edit) setOpenEditDirentModal(true);
        else setOpenNewDirentModal(true);
    }
    return (
        <div ref={galleryRef} className='flex flex-col justify-center items-center'>
            {openNewDirentModal && <DirentConfiguration setTriggerRefresh={setTriggerRefresh} newDirent={true} currentDirent={currentDirent} openModal={openNewDirentModal} setOpenModal={setOpenNewDirentModal} />}
            {openEditDirentModal && <DirentConfiguration setTriggerRefresh={setTriggerRefresh} newDirent={false} currentDirent={currentDirent} openModal={openEditDirentModal} setOpenModal={setOpenEditDirentModal} sections={sections}/>}
            {directory && directory.dirs.map((dirent, index) => {
                return (
                    <Accordion key={dirent.id} expanded={expanded === dirent.id} onChange={handleChange(dirent.id)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="w-full h-full flex justify-start items-center gap-2 ">
                                <span>
                                    <span className="font-bold text-lg">{dirent.name}</span>
                                    <br/>
                                    <span className='text-xs'>{dirent.photos.length} Photos | {dirent.dirs.length} Directories</span>
                                </span>
                                {/* Edit Button */}
                                <button onClick={(e) => handleClick(e, dirent)} className="font-bold border rounded-full w-8 h-8 mx-1">
                                    E
                                </button>
                                {/* New Dirent Button */}
                                <button onClick={(e) => handleClick(e, dirent, false)} className="font-bold border rounded-full w-8 h-8 mx-1">
                                    +
                                </button>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PhotoManager key={dirent.id} setTriggerRefresh={setTriggerRefresh} directory={dirent} sections={sections}/>
                            <Album photoSet={dirent.photos} handleClick={handleClick} />
                        </AccordionDetails>
                    </Accordion>
                )
            }
            )}
            {galleryRef ? <button onClick={(e) => handleClick(e, {...directory, 'name': 'root'}, false)} className="font-bold border rounded-full w-8 h-8 text-white">+</button> : null}
        </div>
    );
}

export default PhotoManager;