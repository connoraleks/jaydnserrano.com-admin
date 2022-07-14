import {useState} from "react";
import Navbar from "./Navbar";
import SectionManager from "./SectionManager";
import UploadManager from "./UploadManager";
import Dashboard from "./Dashboard";
import PhotoManager from "./PhotoManager";
const AdminPanel = () => {
    const [page, setPage] = useState("dashboard");
    return (
        <div id='AdminPanel' className="h-full w-full mt-20">
            <Navbar setPage={setPage}/>
            {page === "dashboard" && <Dashboard />}
            {page === "sections" && <SectionManager />}
            {page === "photos" && <UploadManager />}
            <PhotoManager />
        </div>
    );
}
export default AdminPanel;