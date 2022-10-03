import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import { useState, useEffect, useRef } from 'react';
const AdminPanel = () => {
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [openEditBox, setOpenEditBox] = useState(false);
    useEffect(() => {
        if(triggerRefresh) {
            console.log('refreshing');
            setTriggerRefresh(false);
        }
    }, [triggerRefresh]);
    useEffect(() => {
        console.log(openEditBox);
        editBox.current.style.display = openEditBox ? 'flex' : 'none';
    }, [openEditBox]);
    const editBox = useRef(null);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <main className='w-full h-full p-4 flex justify-center items-center'>
                <div className='w-fit h-fit border rounded-lg border-gray-600 p-4'>
                    <PhotoManager setOpenEditBox={setOpenEditBox} id={"root"}/>
                </div>
            </main>
            <div ref={editBox} className='absolute w-screen h-screen bg-transparent backdrop-blur-2xl top-0 flex flex-col justify-center items-center z-50 p-4'>
                <button className="absolute top-0 right-0 text-white mr-4 mt-4" onClick={() => {
                    setOpenEditBox(false);
                }}>X</button>
                <div className='w-fit h-fit border rounded-lg border-gray-300 p-4 text-white'>
                    <h1>{openEditBox ? openEditBox.name : null}</h1>
                    <p>Photo ID: {openEditBox ? openEditBox.id : null}</p>
                    <p>Photo URL: {openEditBox ? openEditBox.src : null}</p>
                    <p>Width: {openEditBox ? openEditBox.width : null} , Height: {openEditBox ? openEditBox.height : null}</p>
                    <p>Last Updated: {openEditBox ? openEditBox.created_at : null}</p>
                </div>
            </div>
        </div>
    );
}
export default AdminPanel;