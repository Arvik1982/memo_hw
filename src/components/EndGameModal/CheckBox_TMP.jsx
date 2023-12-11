import styles from "./EndGameModal.module.css"
import {gameRegimeReducer} from "../../store/sliceGame"
import { useDispatch } from "react-redux"

export function CheckboxFunc() {
const dispatch =useDispatch()
  return (
    <div className={styles.checkbox}>
      <h2>Режим до трех ошибок</h2>
      
      <input id="checkBoxInput"  className={styles.custom__box} onClick={()=>dispatch(gameRegimeReducer())} type="checkBox"></input>
      <label htmlFor="checkBoxInput" ></label>
    </div>
  )
}
