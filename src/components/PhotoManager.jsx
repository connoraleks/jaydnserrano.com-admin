import {useState, useEffect} from 'react'
import axios from 'axios'
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Photo from './Photo'
const api = 'https://api.jaydnserrano.com/photos';
const PhotoManager = () => {
    const [photos, setPhotos] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const getPhotos = () => {
        setLoading(true)
        axios(api)
        .then(res => {
            console.log(res.data);
            if(res.data.success) {
                setPhotos(res.data.response)
            }
            else{
                setError(res.data.error)
            }
            setLoading(false)
        })
        .catch(err => {
            setError(err)
            setLoading(false)
        }
        )
    }
    const onDelete = (photo) => {
        axios.delete(api, {
            data: {
                section: photo.section,
                name: photo.name
            }
        })
        .then(res => {
            if(res.data.success) {
                getPhotos()
            }
            else{
                setError(res.data.error)
            }
        })
        .catch(err => {
            setError(err)
        })
    }
    useEffect(() => { getPhotos() }, []);
    return (
        <div className="flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold mb-4">Photo Manager</h1>
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center">{error}</div>}
            {!loading && Object.keys(photos).map(section => (
                <Accordion key={section} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className="text-white" variant="h6">{section}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {!loading && photos[section].map(photo => (
                                <Photo key={photo.name} photo={{'name': photo.name, section: section, src: photo.url, file: null}} onDelete={onDelete}/>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
export default PhotoManager;