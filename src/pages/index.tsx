import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/cliente'

const inter = Inter({ subsets: ['latin'] })
const clientes  = [
  new Cliente('Ana', 34, '1'),
  new Cliente('Bia', 45, '2'),
  new Cliente('Carlos', 23, '3'),
  new Cliente('Pedro', 54, '4'),
]

export default function Home() {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen py-2 bg-slate-500 '>
        
        <Layout titulo='Cadastro Simples'>
          <span>
        <Tabela clientes={clientes}></Tabela>
          </span>
        </Layout>
      </div>

    </>

  )
}
