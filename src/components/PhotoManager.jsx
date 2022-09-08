import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import DirentConfiguration from './DirentConfiguration';
const PhotoManager = ({galleryref, directory}) => {
    const [expanded, setExpanded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentDirent, setCurrentDirent] = useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    return (
        <div ref={galleryref} className="h-fit text-white my-4">
            <DirentConfiguration currentDirent={currentDirent} openModal={openModal} setOpenModal={setOpenModal} />
            {/* Create an accordion for each section in directory */}
            {directory && directory.dirs.map((section) => {
                return (
                    <Accordion id={section.id} expanded={expanded === section.id} key={section.id} onChange={handleChange(section.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${section.name}-content`}
                            id={`${section.name}-header`}
                        >
                            <Typography className=''>
                                <div className='flex flex-col'>
                                    <span className="flex justify-left gap-4 font-bold text-2xl align-center">
                                        {section.name}
                                        <div className='border border-white rounded-full hover:bg-slate-500 flex justify-center align-center'><button 
                                            className="w-8 h-8"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setOpenModal(true);
                                                setCurrentDirent(section);
                                            }}>
                                        +
                                        </button></div>
                                    </span> 
                                    <span className="text-slate-500">{section.photos.length+ ' photos | ' + section.dirs.length + ' subcategories'}</span>
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* PhotoManager for this layer */}
                            <PhotoManager directory={section}></PhotoManager>
                            {section.photos.map((photo) => {
                                return (
                                    <div className="w-1/4">
                                        <img src={photo.src} alt={photo.name} className="w-full h-auto"/>
                                    </div>
                                )
                            }
                            )}                            
                        </AccordionDetails>
                    </Accordion>
                )
            } )}
        </div>
    );
}

export default PhotoManager;