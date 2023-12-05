interface BotaoProps {
    children?: any
    cor?: 'green' | 'blue' | 'gray'
    acao?: () => void
    icone?: any
}


export default function Botao(props: BotaoProps) {
    const cor = props.cor ?? 'gray'
    return (
        <button onClick={props.acao}
            className={`bg-gradient-to-r from-${cor}-400 to-${cor}-700
            flex justify-center items-center
                text-white rounded-xl p-2 px-4  mb-2
                hover:bg-green-500`}>
            {props.children}
        </button>
    )
}