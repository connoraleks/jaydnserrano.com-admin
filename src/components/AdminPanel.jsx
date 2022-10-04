import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import EditBox from "./EditBox";
import { useState, useEffect } from 'react';
const AdminPanel = () => {
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [editDirent, setEditDirent] = useState(false);
    useEffect(() => {
        if(triggerRefresh) {
            console.log('refreshing');
            setTriggerRefresh(false);
        } else {
            console.log('not refreshing');
        }
    }, [triggerRefresh]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0 p-4 md:p-16">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <main className='w-full h-full p-4 flex justify-center items-center border border-white rounded-2xl bg-white bg-opacity-60'>
                <div className='w-full h-full p-4 flex flex-col justify-center items-center gap-4 text-black'>
                    <h1 className='text-4xl font-bold mb-8'>Content Manager</h1>
                    <PhotoManager setEditDirent={setEditDirent} id={"root"}/>
                </div>
            </main>
            {editDirent && <EditBox setEditDirent={setEditDirent} dirent={editDirent} onEdit={(dirent, name, parent) => {
                console.log(dirent, name, parent);
            }}/>}
        </div>
    );
}
export default AdminPanel;