
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface ModalProps {
    aberto: boolean
    abrirOuFecharModal: () => void
}


export default function AlertDialog(props: ModalProps) {




    return (
        <>

            <Dialog
                open={props.aberto}
                onClose={props.abrirOuFecharModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"o titulo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       o bodydfgdfgdgdgdfggggggggggggggggggggg
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.abrirOuFecharModal}>fechar</Button>
                    <Button onClick={props.abrirOuFecharModal} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
