import Cliente from "../core/Cliente"
import { iconeedicao, iconeexclusao } from "./icons"

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void

}



export default function Tabela(props: TabelaProps) {
    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado
    function renderizarCabecalho() {

        return (
            <tr className="text-center p-4">
                <th className="text-center p-4" >codigo</th>
                <th>nome</th>
                <th>idade</th>
                {exibirAcoes ? <th>Ações </th> : false}
            </tr>
        )
    }
    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id}
                    className={`text-center p-4 ${i % 2 === 1 ?
                        'bg-gray-200' : ''}`}>
                    <td className={'p-2'}>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            )
        },
        )
    }
    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`flex justify-center items-center
                text-green-600 rounded-full p-2 m-1
                hover:bg-gray-50`}>
                        {iconeedicao}
                    </button>) : false}
                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={`flex justify-center items-center
                text-red-600 rounded-full p-2 m-1
                hover:bg-gray-50`}>
                        {iconeexclusao}
                    </button>) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={` text-gray-100 bg-gradient-to-r from-gray-500 to-gray-800`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()
                }
            </tbody>

        </table>
    )

}