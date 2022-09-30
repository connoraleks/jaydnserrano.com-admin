import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhotoAlbum from 'react-photo-album'
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import DirentConfiguration from './DirentConfiguration';
const PhotoManager = ({setTriggerRefresh, galleryRef, directory}) => {
    const [expanded, setExpanded] = useState(false);
    const [openNewDirentModal, setOpenNewDirentModal] = useState(false);
    const [openEditDirentModal, setOpenEditDirentModal] = useState(false);
    const [currentDirent, setCurrentDirent] = useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    return (
        <div ref={galleryRef} className="h-fit text-white my-4">
            <DirentConfiguration setTriggerRefresh={setTriggerRefresh} newDirent={true} currentDirent={currentDirent} openModal={openNewDirentModal} setOpenModal={setOpenNewDirentModal}/>
            <DirentConfiguration  setTriggerRefresh={setTriggerRefresh} newDirent={false} currentDirent={currentDirent} openModal={openEditDirentModal} setOpenModal={setOpenEditDirentModal} />
            {/* Create an accordion for each section in directory */}
            {directory && directory.folders.map((section) => {
                return (
                    <Accordion id={section.name} expanded={expanded === section.name} key={section.name} onChange={handleChange(section.name)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${section.name}-content`}
                            id={`${section.name}-header`}
                        >
                            <Typography className=''>
                                <div className='flex flex-col'>
                                    <span className="flex justify-left gap-4 font-bold text-2xl align-center">
                                        {/* Name of the section */}
                                        {section.name}
                                        
                                        {/* Add new dirent button */}
                                        <div className='border border-white rounded-full hover:bg-slate-500 flex justify-center align-center'><button 
                                            className="w-8 h-8"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setCurrentDirent(section);
                                                setOpenNewDirentModal(true);
                                            }}>
                                        +
                                        </button></div>
                                        {/* Edit section button */}
                                        <div className='border border-white rounded-full hover:bg-slate-500 flex justify-center align-center'><button
                                            className="w-8 h-8"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setCurrentDirent(section);
                                                setOpenEditDirentModal(true);
                                            }}>
                                        E
                                        </button></div>
                                    </span> 
                                    <span className="text-slate-500">{section.photos.length+ ' photos | ' + section.folders.length + ' subcategories'}</span>
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* PhotoManager for this layer */}
                            <PhotoManager setTriggerRefresh={setTriggerRefresh} directory={section}></PhotoManager>
                            <PhotoAlbum
                                photos={section.photos}
                                layout='rows'
                                targetRowHeight={350}
                                margin={2}
                                onClick={ (event, photo) => {
                                    // open link in new tab
                                    event.stopPropagation();
                                    setCurrentDirent(photo);
                                    setOpenEditDirentModal(true);
                                }}
                            />                         
                        </AccordionDetails>
                    </Accordion>
                )
            } )}
            {/* If galleryRef is passed this is the root PhotoManager, so make an add button to add Dirents to the root */}
            {galleryRef && <div className='flex justify-center align-center'><button
                className="border border-white rounded-full hover:bg-slate-500 w-8 h-8"
                onClick={(event) => {
                    event.stopPropagation();
                    setCurrentDirent(directory);
                    console.log(directory);
                    setOpenNewDirentModal(true);
                }}>
            +
            </button></div>}
        </div>
    );
}

export default PhotoManager;