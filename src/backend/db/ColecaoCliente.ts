import Cliente from '@/src/core/Cliente';
import ClienteRepository from '../../core/ClienteRepository';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import db from '../config';

export default class ColecaoCliente implements ClienteRepository {
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
                id: cliente.id,
            };
        },
        fromFirestore: (snapshot: any, options: any) => {
            const data = snapshot.data(options);
            return new Cliente(data.nome, data.idade, data.id);
        },
    };

    async excluir(cliente: Cliente): Promise<void> {
        await deleteDoc(doc(db, 'Clientes', cliente.id));
    }

    async getAll(): Promise<Cliente[]> {
        const querySnapshot = await getDocs(collection(db, 'Clientes').withConverter(this.#conversor));
        const clientes: Cliente[] = [];

        querySnapshot.forEach((doc) => {
            clientes.push(doc.data());
        });

        return clientes;
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        const clientesRef = collection(db, 'Clientes').withConverter(this.#conversor);

        if (cliente?.id) {
            // Verificar se o cliente já existe
            const docSnapshot = await doc(clientesRef, cliente.id);

            if (docSnapshot.id) {
                // Atualizar o cliente se ele já existir
                await updateDoc(doc(clientesRef, cliente.id), {
                    nome: cliente.nome,
                    idade: cliente.idade,
                });
            } else {
                // Adicionar um novo cliente
                await setDoc(doc(clientesRef, cliente.id), {
                    nome: cliente.nome,
                    idade: cliente.idade,
                    id: cliente.id,
                });
            }
        }

        return cliente;
    }
}
