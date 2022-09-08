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
const Photo = ({ photo, onDelete, sections }) => {
    return (
        <div className="photo">
            <h1>{JSON.stringify(photo)}</h1>
        </div>
    );
}
export default Photo;