import {useState, useEffect} from 'react'
import axios from 'axios'
const api = 'http://api.jaydnserrano.com/photos'
const PhotoManager = () => {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios(api)
        .then(res => {
            /*
            Example of res.data:
            {
                "response": {
                    "Cars": [
                        {
                            "name": "PNG_image.png",
                            "url": "/uploads/Cars/PNG_image.png"
                        }
                    ], 
                    "Wallpapers": [
                        {
                            "name": "1920x1200-153342-Man.jpg", "url": "/uploads/Wallpapers/1920x1200-153342-Man.jpg"
                        }, 
                        {
                            "name": "Wallpaper_dark_mode_.jpeg", "url": "/uploads/Wallpapers/Wallpaper_dark_mode_.jpeg"
                        }
                    ]
                }, 
                "success": true
            }
            */
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
    }, [])
    useEffect(() => {
        console.log(photos);
    }, [photos]);
}
export default PhotoManager;