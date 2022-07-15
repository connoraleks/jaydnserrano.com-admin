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
import axios from 'axios';
const Photo = ({ photo, onDelete, sections }) => {
    const [section, setSection] = useState(photo.section);
    const [name, setName] = useState(photo.name);

    useEffect(() => {
        photo.name = name;
        photo.section = section;
    }
    , [name, section]);
    return (
        <div className="w-full h-36 border border-white flex justify-between items-center overflow-hidden">
            {/* image with 28rem height and width */}
            <img src={photo.src} alt={name} className="h-full" />
            <div className="flex flex-col p-4 gap-2">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-fit p-2 border border-white rounded-lg bg-transparent" />
                {/* Dropdown with section options from api OR section value if upload is true or false*/}
                {sections && <select value={section} onChange={e => setSection(e.target.value)} className="w-full h-fit p-2 border border-white rounded-lg bg-transparent">
                    {sections.map(section => <option key={section} value={section}>{section}</option>)}
                </select>}
                {!sections && <div className="w-full h-fit p-2 border border-white">{section}</div>}
                <button onClick={() => onDelete(photo)}>Delete</button>
            </div>
        </div>
    );
}
export default Photo;