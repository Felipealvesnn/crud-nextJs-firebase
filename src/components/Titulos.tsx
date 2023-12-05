export default function Titulo(prop: any) {

    return (
        <div className="flex flex-col justify-center">
            <h1 className=' py-2 px-5 text-3xl '>
                {prop.children}

            </h1>
            <hr className="border-2 border-t-gray-500" />
        </div>
    )

}