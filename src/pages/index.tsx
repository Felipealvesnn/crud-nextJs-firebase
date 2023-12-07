// ...

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Tabela from '../components/Tabela';
import Botao from '../components/Botao';
import Cliente from '../core/Cliente';
import Modal from '../components/ModalCadastro';
import ClienteRepository from '../core/ClienteRepository';
import ColecaoCliente from '../backend/db/ColecaoCliente';

export default function Home() {
  const repo: ClienteRepository = new ColecaoCliente();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente>(Cliente.vazio());
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    repo.getAll().then((clientes) => {
      setClientes(clientes);
    });
  }, [repo]);

  const abrirOuFecharModal = () => {
    setModalOpen(!modalOpen);
  };

  function clienteEditar(cliente: Cliente) {
    setClienteEmEdicao(cliente);
    abrirOuFecharModal();
  }

  async function clienteExcluido(cliente: Cliente) {
    try {
      await repo.excluir(cliente);
      setClientes(clientes.filter((c) => c.id !== cliente.id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  }

  async function clienteSalvo(cliente: Cliente) {
    try {
      await repo.salvar(cliente);
      setClientes((prevClientes) => {
        const index = prevClientes.findIndex((c) => c.id === cliente.id);
        if (index !== -1) {
          // Se o cliente já existe, atualize-o
          const newClientes = [...prevClientes];
          newClientes[index] = cliente;
          return newClientes;
        } else {
          // Se o cliente não existe, adicione-o
          return [...prevClientes, cliente];
        }
      });

      setClienteEmEdicao(Cliente.vazio()); // Limpar o cliente em edição após salvar
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-2 bg-slate-500 '>
      <Layout titulo='Cadastro Simples'>
        <Botao cor="gray" acao={abrirOuFecharModal}>
          Novo cliente
        </Botao>
        <Tabela
          clientes={clientes}
          clienteExcluido={clienteExcluido}
          clienteSelecionado={clienteEditar}
        />
      </Layout>
      <Modal
        onClose={() => setClienteEmEdicao(Cliente.vazio())}
        ClienteMudou={clienteSalvo}
        aberto={modalOpen}
        abrirOuFecharModal={abrirOuFecharModal}
        cliente={clienteEmEdicao} // Passar o cliente em edição para o modal
      ></Modal>
    </div>
  );
}
