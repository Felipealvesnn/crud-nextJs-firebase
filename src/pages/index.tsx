import { useRef, useState } from 'react';
import Layout from '../components/Layout';
import Tabela from '../components/Tabela';
import Botao from '../components/Botao';
import Cliente from '../core/Cliente';
import Modal from '../components/ModalCadastro';

export default function Home() {
  const [clientes, setClientes] = useState([
    new Cliente('Ana', 34, '1'),
    new Cliente('Bia', 45, '2'),
    new Cliente('Carlos', 23, '3'),
    new Cliente('Pedro', 54, '4'),
  ]);

  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function clienteEditar(cliente: Cliente) {
    setClienteEmEdicao(cliente);
    abrirOuFecharModal();
  }

  function clienteExcluido(cliente: Cliente) {
    const index = clientes.indexOf(cliente);
    setClientes(clientes.filter((_, i) => i !== index));
  }

  function clienteSalvo(cliente: Cliente) {
    if (clienteEmEdicao) {
      // Se clienteEmEdicao não for nulo, significa que estamos editando um cliente existente
      const index = clientes.indexOf(clienteEmEdicao);
      const novosClientes = [...clientes];
      novosClientes[index] = cliente;
      setClientes(novosClientes);
      setClienteEmEdicao(null); // Limpar o cliente em edição após salvar
    } else {
      // Caso contrário, estamos adicionando um novo cliente
      setClientes([...clientes, cliente]);
    }
  }

  const abrirOuFecharModal = () => {
    setModalOpen(!modalOpen);
   
   
  };

  return (
    <>
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
          onClose={() => setClienteEmEdicao(null)}
          ClienteMudou={clienteSalvo}
          aberto={modalOpen}
          abrirOuFecharModal={abrirOuFecharModal}
          cliente={clienteEmEdicao as Cliente} // Passar o cliente em edição para o modal
        ></Modal>
      </div>
    </>
  );
}
