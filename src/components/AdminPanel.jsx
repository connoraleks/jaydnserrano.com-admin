import Navbar from "./Navbar";
import PhotoManager from "./PhotoManager";
import AddBox from "./AddBox";
import EditBox from "./EditBox";
import { useState, useEffect } from 'react';
import axios from "axios";
const AdminPanel = () => {
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [editDirent, setEditDirent] = useState(false);
    const [newDirent, setNewDirent] = useState(false);

    useEffect(() => {
        setTriggerRefresh(false);
    }, [triggerRefresh]);
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0 p-4 md:p-16">
            <Navbar setTriggerRefresh={setTriggerRefresh}/>
            {/* Button that get requests api.jaydnserrano.com/database */}
            <main className='w-full h-full p-4 flex justify-center items-center'>
                <div className='w-full h-full p-4 flex flex-col justify-center items-center gap-4 text-white'>
                    <h1 className='text-4xl font-bold mb-8 text-center'>Content Manager</h1>
                    {!triggerRefresh && <PhotoManager setNewDirent={setNewDirent} setEditDirent={setEditDirent} id={"root"}/>}
                </div>
            </main>
            {editDirent && 
            <EditBox 
                setEditDirent={setEditDirent} 
                dirent={editDirent} 
                onEdit={(dirent) => {
                const formData = new FormData();
                    formData.append('name', dirent.name);
                    formData.append('parent', dirent.parent);
                    formData.append('action', 'edit');
                    axios.post(`https://api.jaydnserrano.com/dirents/${dirent.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        console.log(res);
                        setTriggerRefresh(true);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }}
                onDelete={(dirent) => {
                    axios.delete(`https://api.jaydnserrano.com/dirents/${dirent.id}`)
                    .then(res => {
                        console.log(res);
                        setTriggerRefresh(true);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }}
            />
            }
            { newDirent && 
            <AddBox 
                setNewDirent={setNewDirent} 
                onAdd={(dirent) => {
                    console.log(dirent);
                    if(dirent.isDir === 1) {
                        const formData = new FormData();
                        formData.append('name', dirent.name);
                        formData.append('parent', dirent.parent);
                        formData.append('isDir', dirent.isDir);
                        formData.append('action', 'add');
                        axios.post(`https://api.jaydnserrano.com/dirents`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(res => {
                            console.log(res);
                            setTriggerRefresh(true);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    } else if(dirent.isDir === 0) {
                        for(let x = 0; x < dirent.files.length; x++) {
                            const formData = new FormData();
                            formData.append('name', dirent.files[x].name);
                            formData.append('parent', dirent.parent);
                            formData.append('isDir', dirent.isDir);
                            formData.append('file', dirent.files[x]);
                            formData.append('action', 'add');
                            axios.post(`https://api.jaydnserrano.com/dirents`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                        setTriggerRefresh(true);
                    }
            }}/>}
        </div>
    );
}
export default AdminPanel;