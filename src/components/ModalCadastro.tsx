import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Cliente from '../core/Cliente';
import Inputs from './Inputs';

interface ModalProps {
    aberto: boolean;
    ClienteMudou?: (cliente: Cliente) => void;
    onClose: () => void;
    cliente?: Cliente;
    abrirOuFecharModal: () => void
}

export default function AlertDialog(props: ModalProps) {
    const { aberto, onClose, ClienteMudou, cliente } = props;
    const id = cliente?.id;
    const [nome, setNome] = useState(cliente?.nome ?? '');
    const [idade, setIdade] = useState(cliente?.idade ?? 0);

    const handleSave = () => {
        if (ClienteMudou) {
            ClienteMudou(new Cliente(nome, idade, id));
            onClose();
            setNome('');
            setIdade(0);
        }
    };

    useEffect(() => {
        setNome(cliente?.nome ?? '');
        setIdade(cliente?.idade ?? 0);
    }, [cliente]);

    const body = () => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {id && <Inputs disabled tipo='number' texto='Id' valor={id} />}
            <Inputs valorMudou={setNome} tipo='texto' texto='Nome' valor={nome} />
            <Inputs valorMudou={setIdade} valor={idade} tipo='number' texto='Idade' />
            <Inputs tipo='password' showPassword texto='Senha' />
        </Box>
    );

    return (
        <Dialog
            open={aberto}
            onClose={() => {
                onClose();
                props.abrirOuFecharModal();
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Cadastrar pessoa"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{body()}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onClose();
                    props.abrirOuFecharModal();
                }}>Fechar</Button>
                <Button onClick={handleSave} autoFocus>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
