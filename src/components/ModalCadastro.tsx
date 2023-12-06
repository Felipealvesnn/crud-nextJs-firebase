
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Inputs from './Inputs';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Cliente from '../core/Cliente';
interface ModalProps {
    aberto: boolean
    ClienteMudou?: (cliente: Cliente) => void
    abrirOuFecharModal: () => void
    cliente?: Cliente
   


}

// ... (imports e interface ModalProps)
// ... (imports e interface ModalProps)

export default function AlertDialog(props: ModalProps) {
    const id = props.cliente?.id;
    const [nome, setNome] = useState(props.cliente?.nome ?? '');
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

    // Atualizar os estados internos quando o cliente em edição for alterado
    useEffect(() => {
        setNome(props.cliente?.nome ?? '');
        setIdade(props.cliente?.idade ?? 0);
    }, [props.cliente]);

    function body() {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {id ? <Inputs disabled tipo='number' texto='Id' valor={id} /> : null}
                <Inputs valorMudou={setNome} tipo='texto' texto='Nome' valor={nome} />
                <Inputs valorMudou={setIdade} valor={idade} tipo='number' texto='Idade' />
                <Inputs tipo='password' showPassword texto='Senha' />
            </Box>
        );
    }

    return (
        <>
            <Dialog
                open={props.aberto}
                onClose={props.abrirOuFecharModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Cadastrar pessoa"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{body()}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.abrirOuFecharModal}>Fechar</Button>
                    <Button
                        onClick={() => {
                            props.ClienteMudou?.(new Cliente(nome, idade, id));
                            props.abrirOuFecharModal();
                        }}
                        autoFocus
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
