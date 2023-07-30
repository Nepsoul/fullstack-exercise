import StatisticsLine from "./StatisticLine";

const Statistics=(props)=>{
        const all=props.good+props.bad+props.neutral
        return(
            <div> 
              <h1>statistics</h1>
              <StatisticsLine text="good" value={props.good}/>
              <StatisticsLine text="neutral" value={props.neutral}/>
              <StatisticsLine text="bad" value={props.good}/>
              <StatisticsLine text="all" value={all}/>
              <StatisticsLine text="average" value={(props.good-props.bad)/3}/>
              <StatisticsLine text="positive" value={`${(props.good/all)*100} %`}/>    
            </div> 
        )
}
    
      

export default Statistics;