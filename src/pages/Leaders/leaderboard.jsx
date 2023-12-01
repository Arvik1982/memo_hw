import { Link} from "react-router-dom"
import styles from "./LeaderPage.module.css"
import { getLeaders } from "../../api"
import { useEffect } from "react"
import { useState } from "react"



export function LeadersPage() {
const [leaders, setLeaders] = useState();

useEffect(()=>{
  

getLeaders()
.then((data)=>{ 

let sortLeaders=data.leaders.sort((el,el2)=>el.time-el2.time)
let length=sortLeaders.length

for (let i=1; i<length; i++){

    sortLeaders.forEach(el=> {{
        
        {
         el.position = i++
        }   
        
        }
        
    });
}

console.log(sortLeaders)
setLeaders(sortLeaders)
})
    },[])
  return (
    <>
    <div className={styles.header}>
    <h1 className={styles.text}>
      Лидерборд
    </h1>
    <Link to="/">
        <button className={styles.button}>Начать игру</button> </Link>
    </div>
    <div className={styles.table__header}>
        <h3 style={{fontWeight:'100'}}>Позиция</h3>
        <h3 style={{fontWeight:'lighter'}}>Пользователь</h3>
        <h3 style={{fontWeight:'lighter'}}>Время</h3>
    </div>
    {
        leaders?
    leaders.map((el,index)=>{
    return(
        <div key={index} className={styles.table}>
        <h2>#{el.position}</h2>
        <h2>{el.name}</h2>
        <h2>{
            Math.floor(el.time/60)
             }:{
                el.time-(Math.floor(el.time/60))*60
             }</h2>  
        </div>)
    
    }):null

    }
    </>
  )
}