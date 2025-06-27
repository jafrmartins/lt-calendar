export function Button({ onClick, children, ...props }) {

    return <button style={{ ...(props.variant == 'icon' ? { borderRadius: '50% !important', padding: '0 0 0 0  !important', margin: '0 0 0 0  !important', width: '100% !important', height: '100% !important'} : {})}} onClick={onClick} className={`whitespace-nowrap ${
        props.variant == 'primary' ?  'bg-gradient-to-r from-primary-100 to-primary-300' : 
        props.variant == 'secondary' ? 'bg-gradient-to-r from-secondary-100 to-secondary-300' : 
        props.variant == 'success' ? 'bg-gradient-to-r from-green-100 to-green-300' : 
        props.variant == 'danger' ? 'bg-gradient-to-r from-red-100 to-red-300' : 
        props.variant == 'warning' ? 'bg-gradient-to-r from-yellow-100 to-yellow-300 text-black' : 
        props.variant == 'text' ? '' : '' } rounded-lg px-3 py-1.5 text-center text-sm font-medium sm:rounded-xl lg:px-5 lg:py-2.5
        `} {...props}>
        { children }
    </button>

}

export function IconButton({ onClick, children, ...props }) {

    return <button style={{ borderRadius: '50% !important', padding: '2.5px 2.5px 2.5px 2.5px  !important', margin: '0 0 0 0  !important', width: '100% !important', height: '100% !important'}} onClick={onClick} {...props}>
        { children }
    </button>

}