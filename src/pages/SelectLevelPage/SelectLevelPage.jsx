import { Link } from "react-router-dom"
import styles from "./SelectLevelPage.module.css"
import { CheckboxFunc } from "../../components/EndGameModal/checkBox"
import {setGameNumber,setSuperpowerA, setSuperpowerB} from "../../store/sliceGame"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

export function SelectLevelPage() {
const superPowerA = useSelector(state=>state.game.superPowerA)
const superPowerB = useSelector(state=>state.game.superPowerB)
const[superPowerOpen, setSuperPowerOpen]=useState('')
  const dispatch=useDispatch()

  return (
    <div className={styles.container}>

      <div className={styles.modal}>




        <h2 className={styles.title}>Выбери сложность</h2>
        <div onClick={(event)=> {event.stopPropagation(); superPowerOpen?setSuperPowerOpen(false):setSuperPowerOpen(true)}} className={styles.superpower__block}>
        <h2 className={styles.superpower__block_text}>Суперсилы</h2>
        </div>
<div style={!superPowerOpen?{display:'none' }:{position:'relative'}}>
<div className={styles.superpower__select}>

<div onClick={()=>{ dispatch(setSuperpowerA('a'))}} className={styles.superpower__select_elementA }>
{superPowerA==='a'&&
<div className={styles.select__element_input }>
<input defaultChecked id="checkBoxInputSuper"  className={styles.custom__box} type="checkBox"></input>
<label htmlFor="checkBoxInputSuper" ></label>
</div>

}

</div>
<div onClick={()=>dispatch(setSuperpowerB('b'))} className={styles.superpower__select_elementB }>
{superPowerB==='b'&&<div className={styles.select__element_input } >
<input defaultChecked id="checkBoxInputSuper"  className={styles.custom__box} type="checkBox"></input>
<label htmlFor="checkBoxInputSuper" ></label>
</div>}
</div>




</div>
</div>

        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link onClick={()=>{dispatch(setGameNumber(1))}} className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link onClick={()=>{dispatch(setGameNumber(2))}} className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link onClick={()=>{dispatch(setGameNumber(3))}} className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <CheckboxFunc />
        <Link to="/game/leaderboard" > Перейти к лидерборду </Link>
      </div>
    </div>
  )
}
