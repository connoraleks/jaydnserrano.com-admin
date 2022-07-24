import {useState} from "react";
import Navbar from "./Navbar";
import SectionManager from "./SectionManager";
import UploadManager from "./UploadManager";
import Dashboard from "./Dashboard";
import PhotoManager from "./PhotoManager";
import { Accordion, AccordionSummary, AccordionDetails } from './CustomAccordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        
                    >
                        <Typography>Upload Manager</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        >
                        <UploadManager />
                    </AccordionDetails>
                </Accordion>
                {/* Accordion component for PhotoManager*/}
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fill={'white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        
                    >
                        <Typography>Photo Manager</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        >
                        <PhotoManager />
                    </AccordionDetails>
                </Accordion>
            </div>}
        </div>
    );
}
export default AdminPanel;