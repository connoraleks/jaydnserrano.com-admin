import {useState} from "react";
import Navbar from "./Navbar";
import SectionManager from "./SectionManager";
import UploadManager from "./UploadManager";
import Dashboard from "./Dashboard";
import PhotoManager from "./PhotoManager";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const sx = {
    backgroundColor: '#1f2937',
    color: 'white',
}
const AdminPanel = () => {
    const [page, setPage] = useState("dashboard");
    return (
        <div id='AdminPanel' className="h-full w-full mt-20 z-0">
            <Navbar setPage={setPage}/>
            {page === "dashboard" && <Dashboard />}
            {page === "sections" && <SectionManager />}
            {page === "photos" && 
            <div>
                {/* Accordion component for UploadManager*/}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={sx}
                    >
                        <Typography>Upload Manager</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={sx}>
                        <UploadManager sx={sx}/>
                    </AccordionDetails>
                </Accordion>
                {/* Accordion component for PhotoManger*/}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={sx}
                    >
                        <Typography>Photo Manager</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={sx}>
                        <PhotoManager sx={sx}/>
                    </AccordionDetails>
                </Accordion>
            </div>}
        </div>
    );
}
export default AdminPanel;