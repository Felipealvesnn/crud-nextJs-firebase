import React, { useState } from 'react';
import Cliente from "../core/Cliente";
import { iconeedicao, iconeexclusao } from "./icons";

interface TabelaProps {
    clientes: Cliente[];
    clienteSelecionado?: (cliente: Cliente) => void;
    clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {
    const [clienteParaExcluir, setClienteParaExcluir] = useState<Cliente | null>(null);

    function confirmarExclusao(cliente: Cliente) {
        setClienteParaExcluir(cliente);
    }

    function cancelarExclusao() {
        setClienteParaExcluir(null);
    }

    function handleExcluirConfirmado() {
        if (clienteParaExcluir) {
            props.clienteExcluido?.(clienteParaExcluir);
            cancelarExclusao();
        }
    }

    function renderizarCabecalho() {
        return (
            <tr className="text-center p-4">
                <th className="text-center p-4">Código</th>
                <th>Nome</th>
                <th>Idade</th>
                {props.clienteExcluido || props.clienteSelecionado ? <th>Ações</th> : false}
            </tr>
        );
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id}
                    className={`text-center p-4 ${i % 2 === 1 ? 'bg-gray-200' : ''}`}>
                    <td className={'p-2'}>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.idade}</td>
                    {(props.clienteExcluido || props.clienteSelecionado) ? renderizarAcoes(cliente) : false}
                </tr>
            );
        });
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
                    <>
                        <button onClick={() => confirmarExclusao(cliente)} className={`flex justify-center items-center
                text-red-600 rounded-full p-2 m-1
                hover:bg-gray-50`}>
                            {iconeexclusao}
                        </button>
                        {clienteParaExcluir && (
                            // Modal de confirmação
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-4 rounded-md">
                                    <p>Deseja realmente excluir o cliente {clienteParaExcluir.nome}?</p>
                                    <div className="flex justify-end mt-2">
                                        <button onClick={handleExcluirConfirmado} className="bg-red-500 text-white px-4 py-2 mr-2">Sim</button>
                                        <button onClick={cancelarExclusao} className="bg-gray-200 text-gray-800 px-4 py-2">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : false}
            </td>
        );
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={` text-gray-100 bg-gradient-to-r from-gray-500 to-gray-800`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    );
}
