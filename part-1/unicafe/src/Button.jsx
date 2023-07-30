const Button=(props)=>{
    return(
    <div>
      <button onClick={props.goodHandle}>good</button>
      <button onClick={props.neutralHandle}>neutral</button>
      <button onClick={props.badHandle}>bad</button>
    </div>)
}
export default Button;