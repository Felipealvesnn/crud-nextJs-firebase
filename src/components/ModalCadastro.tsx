
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Inputs from './Inputs';
import { Box } from '@mui/material';
import { useState } from 'react';
import Cliente from '../core/Cliente';
interface ModalProps {
    aberto: boolean
    abrirOuFecharModal: () => void
    cliente?: Cliente
}


export default function AlertDialog(props: ModalProps) {
    const id = props.cliente?.id;
    const [nome, setNome] = useState(props.cliente?.nome);
    const [idade, setIdade] = useState(props.cliente?.idade);
    function body() {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                {
                    id ? <Inputs disabled tipo='number' texto='Id' valor={id} /> : null
                }
                <Inputs  tipo='texto' texto='Nome' valor={nome} />
                <Inputs tipo='number' texto='Idade' />
                <Inputs tipo='password' showPassword texto='Senha' />
            </Box>
        )
    }






    return (
        <>

            <Dialog
                open={props.aberto}
                onClose={props.abrirOuFecharModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cadastrar pessoa"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body()}
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
