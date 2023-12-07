import Cliente from '@/src/core/Cliente'
import ClienteRepository from '../../core/ClienteRepository'
import firebase from '../config'


export default class ColecaoCliente implements ClienteRepository {
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
                id: cliente.id
            }
        },
        // recebe algo do firestore e converte pra classe 
        fromFirestore: (snapshot:any, options:any) => {
            const data = snapshot.data(options);
            return new Cliente(data.nome, data.idade, data.id);
        }
    }

    excluir(cliente: Cliente): Promise<void> {
        throw new Error('Method not implemented.')
    }
    getAll(): Promise<Cliente[]> {
        throw new Error('Method not implemented.')
    }
    async salvar(cliente: Cliente): Promise<Cliente> {
        return Cliente.vazio()
    }



}