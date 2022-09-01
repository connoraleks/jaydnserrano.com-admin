import {useState, useEffect} from 'react';
import axios from 'axios';
import Section from './Section';
const SectionManager = () => {
    const [sections, setSections] = useState([]);
    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newSection, setNewSection] = useState('');
    const [parent, setParent] = useState('');
    const api = "https://api.jaydnserrano.com/sections";
    const getSections = () => {
        setLoading(true);
        setError(null);
        setSections([]);
        axios.get(api)
        .then(res => {
            const data = res.data;
            console.log(data);
            if(data.success && data.sections.length > 0) {
                console.log(data.sections);
                setSections(data.sections);
                setCount(data.count);
            }
            else if(data.success && data.sections.length === 0) {
                setSections([]);
            }
            else {
                setError(data.sections);
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
            section: newSection,
            parent: parent
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
                    {/* Dropdown menu to select parent directory */}
                    <select className="bg-white shadow-md border border-gray-300 rounded-md p-2" onChange={(e) => setParent(e.target.value)}>
                        <option value="">Select Parent</option>
                        {sections.map(section => {
                            return (
                                <option key={sections.indexOf(section)} value={section}>{section}</option>
                            );
                        }
                        )}
                    </select>
                    <input type="text" className="bg-white text-indigo-200 text-lg p-2" placeholder="New Section" value={newSection} onChange={(e) => setNewSection(e.target.value)}/>
                    <button className="bg-blue-500 p-2 rounded-lg" onClick={addSection}>Create</button>
                </div>
                {/* List of sections that can be deleted */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    {!loading && sections.map(section => (
                        <Section key={section} section={section} count={count[section]} onDelete={deleteSection}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default SectionManager;