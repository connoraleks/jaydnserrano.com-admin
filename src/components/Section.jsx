const Section = ({section, onDelete}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-4 border-2 border-white rounded-lg p-4">
                <h1 className="text-white text-2xl">{section}</h1>
                <div className="flex flex-col items-center justify-center gap-4">
                    <button className="bg-red-400 text-white text-lg p-2 rounded-lg" onClick={() => onDelete(section)}>Delete</button>
                </div>
            </div>
        </div>
    );
}
export default Section;