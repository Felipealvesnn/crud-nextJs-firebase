import Cliente from "../core/cliente"

interface TabelaProps {
    clientes: Cliente[]

}



export default function Tabela(props: TabelaProps) {
    function renderizarCabecalho() {

        return (
            <tr className="text-left p-4">
                <th className="text-left p-4" >codigo</th>
                <th>nome</th>
                <th>idade</th>
            </tr>
        )
    }
    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} 
                className={`text-left p-4 ${i % 2 === 0 ? 
                'bg-gray-200' : ''}`}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.idade}</td>
                </tr>
            )
        },
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