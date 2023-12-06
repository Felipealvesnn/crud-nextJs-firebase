import { Fragment, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Botao from '../components/Botao'
import Cliente from '../core/Cliente'
import Modal from '../components/ModalCadastro'



const clientes = [
  new Cliente('Ana', 34, '1'),
  new Cliente('Bia', 45, '2'),
  new Cliente('Carlos', 23, '3'),
  new Cliente('Pedro', 54, '4'),
]
function clienteSelecionado(cliente: Cliente) {
  console.log(cliente.nome)
}
function clienteExcluido(cliente: Cliente) {
  console.log(cliente.idade)
}



export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

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
          <Tabela clientes={clientes}
            clienteExcluido={clienteExcluido}
            clienteSelecionado={clienteSelecionado} />

        </Layout>

        <Modal aberto={modalOpen} abrirOuFecharModal={abrirOuFecharModal} ></Modal>
      </div>

    </>

  )
}
