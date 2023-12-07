// ...

import Layout from '../components/Layout';
import Tabela from '../components/Tabela';
import Botao from '../components/Botao';
import Cliente from '../core/Cliente';
import Modal from '../components/ModalCadastro';
import Useclientes from '../hooks/UseClientes';


export default function Home() {
  const { abrirOuFecharModal, clienteSalvo, clienteEditar,
    clienteExcluido, clientes, clienteEmEdicao, modalOpen
    , setClienteEmEdicao
  } = Useclientes();


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
