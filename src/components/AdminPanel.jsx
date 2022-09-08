import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import { useState, useEffect } from 'react';
import axios from 'axios';
const AdminPanel = () => {
    const [dirents, setDirents] = useState(null);
    const fetchDirents = async () => {
        const res = await axios('https://api.jaydnserrano.com/dirents');
        if(res.data.success) setDirents(res.data.dirents);
    }

    useEffect(() => {
        fetchDirents();
    }, []);
    useEffect(() => {
        console.log(dirents);
    }, [dirents]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar/>
            <PhotoManager directory={dirents}/>
        </div>
    );
}
export default AdminPanel;