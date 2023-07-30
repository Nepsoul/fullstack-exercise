const Button=(props)=>{
    return(
    <div>
     <button onClick={props.goodHandler} >good</button>
     <button onClick={props.neutralHandler} >neutral</button>
     <button onClick={props.badHandler} >bad</button>
    </div>)
}
export default Button;