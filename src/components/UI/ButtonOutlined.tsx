import classes from './Button.module.css';
import {ReactNode, useState} from "react";
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import ButtonSecondary from "./ButtonSecondary.tsx";
import {useNavigate} from "react-router-dom";

interface DialogWithVideoProps {
    open: boolean;
    onClose: () => void;
    trailer: string;
    onClick?: () => void;
}

const DialogWithVideo: React.FC<DialogWithVideoProps> = ({ open, onClose, trailer }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent>
                <div style={{ maxHeight: '400px', overflowY: 'auto', textAlign: 'center' }}>
                    <iframe
                        width="100%"
                        height="315"
                        src={trailer}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </DialogContent>
            <DialogActions>
                <ButtonSecondary onClick={onClose}>fechar</ButtonSecondary>
            </DialogActions>
        </Dialog>
    );
};

function ButtonOutlined(props: ButtonOutlinedProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => props.trailer ? handleOpen() : navigate(`/tvshow/${props.seriesId}`)}
                    className={classes.button + ' ' + classes['button-outlined']} {...props}>{props.children}</button>
            {props.trailer && <DialogWithVideo open={open} trailer={props.trailer} onClose={handleClose}/>}
        </>

    )
}

export default ButtonOutlined;

export interface ButtonOutlinedProps {
    trailer?: string
    seriesId?: number
    children: ReactNode
}