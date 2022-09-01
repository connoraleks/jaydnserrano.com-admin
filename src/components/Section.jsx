const Section = ({section, onDelete, count}) => {
    const numsubdirectories = count['num_subdirectories'];
    const numfiles = count['num_files'];
    return (
        <div className="w-48 h-48 border border-white flex flex-col justify-center items-center overflow-hidden p-4 gap-4">
            <h1 className="text-white text-2xl">{section}</h1>
            <h2 className="text-white text-xl">{numfiles} photos</h2>
            <h2 className="text-white text-xl">{numsubdirectories} subdirectories</h2>
            <button className="transition-colors bg-indigo-600 text-white text-lg p-2 rounded-lg hover:bg-indigo-900" onClick={() => onDelete(section)}>Delete</button>
        </div>
    );
}
export default Section;