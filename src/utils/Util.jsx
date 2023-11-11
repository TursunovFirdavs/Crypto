import './Util.scss'

const Container = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export { Container }