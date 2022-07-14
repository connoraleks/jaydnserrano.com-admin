/*
Photo: {
    name: '',
    src: '',
    section: '',
    file: ''
}
onDelete: (name) => {
    setUploadedPhotos(uploadedPhotos.filter(photo => photo.name !== name));
}
*/
import { useState, useEffect } from 'react';
const Photo = ({ photo, onDelete }) => {
    const [section, setSection] = useState(photo.section);
    const [name, setName] = useState(photo.name);
    useEffect(() => {
        photo.name = name;
        photo.section = section;
    }
    , [name, section]);
    return (
        <div className="w-full h-28 border border-white flex justify-center items-center overflow-hidden">
            {/* image with 28rem height and width */}
            <img src={photo.src} alt={name} className="w-28 h-28" />
            <div className="flex flex-col p-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-8 p-2 border border-white rounded-lg bg-transparent" />
                <input type="text" value={section} onChange={e => setSection(e.target.value)} className="w-full h-8 p-2 border border-white rounded-lg bg-transparent"/>
                <button onClick={() => onDelete(photo.file)}>Delete</button>
            </div>
        </div>
    );
}
export default Photo;