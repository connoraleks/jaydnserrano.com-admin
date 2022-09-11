import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
const AdminPanel = () => {
    const [dirents, setDirents] = useState(null);
    const [triggerRefresh, setTriggerRefresh] = useState(true);
    const galleryRef = useRef(null);
    useEffect(() => {
        axios('https://api.jaydnserrano.com/dirents')
        .then(res => {
            if(res.data.success){
                //add 'name': 'root' to the root directory
                let dirs = res.data.dirents;
                dirs.name = 'root';
                dirs.id = '-1';
                setDirents(res.data.dirents);
            }
            else alert("Error fetching dirents: " + res.data.response);
            setTriggerRefresh(false);
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }, [triggerRefresh]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <PhotoManager setTriggerRefresh={setTriggerRefresh} galleryRef={galleryRef} directory={dirents}/>
        </div>
    );
}
export default AdminPanel;