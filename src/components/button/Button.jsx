const Button = ({ children, selected, onClick }) => {
    return (
        <span onClick={onClick} style={{ border: "1px solid #87CEEB", borderRadius: "5px", padding: '10px 20px', backgroundColor: selected ? "#87CEEB" : "", color: selected ? "#000" : "white", fontWeight: selected ? 700 : 500, width: "22%"}}>
            {children}
        </span>
    );
};

export default Button;