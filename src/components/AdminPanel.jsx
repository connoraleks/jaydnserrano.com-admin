import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
const AdminPanel = () => {
    const [dirents, setDirents] = useState(null);
    const [triggerRefresh, setTriggerRefresh] = useState(true);
    const galleryRef = useRef(null);
    useEffect(() => {
        const refresh = async () => {
            setDirents(null);
            const res = await axios.get('https://api.jaydnserrano.com/database');
            if(res.data.success) {
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
            }
            else alert("Error refreshing database: " + res.data.response);
        }
        if(triggerRefresh) refresh();
    }, [triggerRefresh]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <main className='w-full h-full p-4 flex justify-center items-center'>
                {dirents ? <div className='w-fit h-fit border rounded-lg border-gray-600'>
                    <PhotoManager setTriggerRefresh={setTriggerRefresh} galleryRef={galleryRef} directory={dirents}/>
                </div> : 
                <AiOutlineLoading3Quarters className='animate-spin text-6xl text-gray-600'/>}
            </main>
        </div>
    );
}
export default AdminPanel;