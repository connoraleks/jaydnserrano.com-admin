import {useState} from "react";
import Navbar from "./Navbar";
import SectionManager from "./SectionManager";
import PhotoManager from "./PhotoManager";
import Dashboard from "./Dashboard";
const AdminPanel = () => {
    const [page, setPage] = useState("dashboard");
    return (
        <div className="min-h-screen w-screen">
            <Navbar setPage={setPage}/>
            {page === "dashboard" && <Dashboard />}
            {page === "sections" && <SectionManager />}
            {page === "photos" && <PhotoManager />}
        </div>
    );
}
export default AdminPanel;