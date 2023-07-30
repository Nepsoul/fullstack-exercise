const Button=(props)=>{
    return(
    <div>
     <button onClick={props.buttonHandler} >{props.buttonName}</button>
    </div>)
}
export default Button;