const StatisticsLine=(props)=>{
    return(<div>
        <table>
            <tbody>
                <tr>
                   <td>
                    <p>{props.text} {props.value}</p>
                    </td>
                </tr>
            </tbody>
        </table>
   
    </div>)
}

export default StatisticsLine;