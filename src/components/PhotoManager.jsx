import {useState, useEffect} from 'react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Photo from './Photo'
const api = 'http://api.jaydnserrano.com/photos';
const PhotoManager = ({sx}) => {
    const [photos, setPhotos] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const getPhotos = () => {
        setLoading(true)
        axios(api)
        .then(res => {
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
            <h1 className="text-3xl font-bold">Photo Manager</h1>
            <div className="flex flex-col justify-center items-center">
                {loading && <div className="text-center">Loading...</div>}
                {error && <div className="text-center">{error}</div>}
                {Object.keys(photos).map(section => (
                    <Accordion key={section} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon fill={'white'}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={sx}
                        >
                            <Typography>{section}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={sx}>
                            {photos[section].map(photo => (
                                <Photo key={photo.name} photo={{'name': photo.name, section: section, src: photo.url, file: null}} onDelete={onDelete}/>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}
export default PhotoManager;