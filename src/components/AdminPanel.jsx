import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
const AdminPanel = () => {
    const [dirents, setDirents] = useState(null);
    const [sections, setSections] = useState(null);
    const [triggerRefresh, setTriggerRefresh] = useState(true);
    const galleryRef = useRef(null);
    useEffect(() => {
        const refresh = async () => {
            setDirents(null);
            setSections(null);
            const res = await axios.get('https://api.jaydnserrano.com/database');
            if(res.data.success) {
                axios('https://api.jaydnserrano.com/dirents')
                .then(res => {
                    if(res.data.success){
                        //add 'name': 'root' to the root directory
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
    useEffect(() => {
        /* scan through the dirs portion of dirents {dirs: [], photos: []} and add a key value pair for each directory 
        with the key being the directory's id and the value being the directory's name */
        if(dirents){
            let dirs = {};
            const scan = (dirents) => {
                dirents.dirs.forEach(dir => {
                    dirs[dir.name] = dir.id;
                    scan(dir);
                });
            }
            scan(dirents);
            setSections(dirs);
        }
    }, [dirents]);
    useEffect(() => {
        console.log(sections);
    }, [sections]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <main className='w-full h-full p-4 flex justify-center items-center'>
                {dirents && sections ? <div className='w-fit h-fit border rounded-lg border-gray-600 p-4'>
                    <PhotoManager setTriggerRefresh={setTriggerRefresh} galleryRef={galleryRef} directory={dirents} sections={sections}/>
                </div> : 
                <AiOutlineLoading3Quarters className='animate-spin text-6xl text-gray-600'/>}
            </main>
        </div>
    );
}
export default AdminPanel;