import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: '#1f2937',
    borderRadius: '1rem',
    width: '100%',
    minHeight: 'fit-content',
    maxHeight: 'full',
    '&:before': {
        display: 'none',
    },
    }));
    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '12rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor: '#1f2937',
    borderRadius: '1rem',
    color: 'white',
    fill: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: 'white',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderRadius: '1rem',
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '&::-webkit-scrollbar-thumb': {
            display: 'none',
        },
        minHeight: 'fit-content',
        maxHeight: 'full',
        width: '100%',
        overflowY: 'auto',
        color: 'white',
    }));

    export { Accordion, AccordionSummary, AccordionDetails };