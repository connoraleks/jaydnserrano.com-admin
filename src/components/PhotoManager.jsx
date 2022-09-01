import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import axios from 'axios';
import Photo from './Photo'
const Gallerysections = ({gallery}) => {
    const [sections, setSections] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        //Scroll to panel when expanded
        if (isExpanded) {
            const element = document.getElementById(panel);
            setTimeout(() => element.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'center'}), 650);
        }
    }
    const fetchSections = async () => {
        const res = await axios('https://api.jaydnserrano.com/sections');
        if(res.data.success) setSections({'names': res.data.sections, 'count': res.data.count});
    }
    const fetchPhotos = async () => {
        const res = await axios('https://api.jaydnserrano.com/photos');
        if(res.data.success) setPhotos(res.data.photos);
    }
    const onDelete = (photo) => {
        axios.delete('https://api.jaydnserrano.com/photos', {
            data: {
                section: photo.section,
                name: photo.name
            }
        })
        .then(res => {
            if(res.data.success) {
                fetchPhotos()
            }
            else{
                setError(res.data.error)
            }
        })
        .catch(err => {
            setError(err)
        })
    }

    useEffect(() => {
        fetchSections();
    }, []);
    useEffect(() => {
        if(sections) {
            fetchPhotos();
        }
    } , [sections]);
    useEffect(() => {
        if(photos) {
            console.log(photos)
            setLoading(false);
        }
    } , [photos]);
    return (
        <div ref={gallery} className="h-fit text-white my-4">
            {/* Create an accordion for each section in sections */}
            {!loading && !error && sections.names.map((section, index) => {
                return (
                    <Accordion id={index} expanded={expanded === index} key={index} onChange={handleChange(index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${section}-content`}
                            id={`${section}-header`}
                        >
                            <Typography><span className="font-bold text-2xl">{section}</span> <br/> <span className="text-slate-500">{sections.count[section].num_files + ' photos | ' + sections.count[section].num_subdirectories + ' subcategories'}</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {photos[section].map(photo => (
                                <Photo key={photo.name} photo={{'name': photo.name, section: section, src: photo.src, file: null}} onDelete={onDelete}/>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )
            } )}
            {loading && <div className="text-center">
                <div className="spinner-border text-white" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {error && <div className="text-center">
                <div className="text-white">
                    <span className="font-bold text-2xl">Error</span> <br/> <span className="text-slate-500">{error}</span>
                </div>
            </div>}
        </div>
    );
}

export default Gallerysections;