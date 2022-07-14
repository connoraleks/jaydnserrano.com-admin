import {useState, useEffect} from 'react';
import axios from 'axios';
import Section from './Section';
const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newSection, setNewSection] = useState('');
    const api = "http://api.jaydnserrano.com/sections";
    const getSections = () => {
        setLoading(true);
        setError(null);
        setSections([]);
        axios.get(api)
        .then(res => {
            const data = res.data;
            console.log(data);
            if(data.success && data.response.length > 0) {
                setSections(data.response);
            }
            else if(data.success && data.response.length === 0) {
                setSections(['other']);
            }
            else {
                setError(data.response);
            }
            setLoading(false);
        }
        )
        .catch(err => {
            setError(err);
            setLoading(false);
        }
        );
    }
    const deleteSection = (section) => {
        setLoading(true);
        setError(null);
        axios.delete(api, {
            data: {
                sections: [section]
            }
        })
        .then(res => {
            const data = res.data;
            if(data.success) {
                getSections();
            }
            else {
                setError(data.response);
            }
            setLoading(false);
        }
        )
        .catch(err => {
            setError(err);
            setLoading(false);
        }
        );
    }
    const addSection = () => {
        setLoading(true);
        setError(null);
        axios.post(api, {
            sections: [newSection]
        })
        .then(res => {
            const data = res.data;
            if(data.success) {
                getSections();
            }
            else {
                setError(data.response);
            }
            setLoading(false);
        }
        )
        .catch(err => {
            setError(err);
            setLoading(false);
        }
        );
    }
    useEffect(() => {
        getSections();
    }, []);
    return (
        <div id='SectionManager' className="flex flex-col items-center justify-center p-4">
            <div>
                <h1 className="text-white text-2xl">Section Manager</h1>
                <p className="text-indigo-200 text-lg">Section Manager is a group management application that allows you to categorize uploaded photos into sections.</p>
                {/* Loading and Error messages*/}
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {/* Create new section */}
                <div className="flex justify-center items-center gap-4 p-4">
                    <input type="text" className="bg-white text-indigo-200 text-lg p-2" placeholder="New Section" value={newSection} onChange={(e) => setNewSection(e.target.value)}/>
                    <button className="bg-blue-500 p-2 rounded-lg" onClick={addSection}>Create</button>
                </div>
                {/* List of sections that can be deleted */}
                <div className="flex flex-col justify-center items-center gap-4">
                    {!loading && sections.map(section => (
                        <Section key={section} section={section} onDelete={deleteSection}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SectionManager;