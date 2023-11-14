import styles from "./EndGameModal.module.css"
import {gameRegimeReducer} from "../../store/sliceGame"
import { useDispatch } from "react-redux"

export function CheckboxFunc() {
const dispatch =useDispatch()
  return (
    <div className={styles.checkbox}>
      <h2>режим до 3х ошибок</h2>
      <input onClick={()=>dispatch(gameRegimeReducer())} type="checkBox"></input>
    </div>
  )
}
