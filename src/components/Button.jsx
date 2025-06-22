export function Button({ onClick, children, ...props }) {

    return <button onClick={onClick} className={`whitespace-nowrap ${
        props.variant == 'primary' ?  'bg-gradient-to-r from-primary-100 to-primary-300' : 
        props.variant == 'secondary' ? 'bg-gradient-to-r from-secondary-100 to-secondary-300' : 
        props.variant == 'success' ? 'bg-gradient-to-r from-green-100 to-green-300' : 
        props.variant == 'danger' ? 'bg-gradient-to-r from-red-100 to-red-300' : 
        props.variant == 'warning' ? 'bg-gradient-to-r from-yellow-100 to-yellow-300 text-black' : 
        props.variant == 'text' ? '' : '' } rounded-lg px-3 py-1.5 text-center text-sm font-medium hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5`} {...props}>
        { children }
    </button>

}