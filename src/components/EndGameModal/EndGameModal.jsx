import styles from "./EndGameModal.module.css"
import { Button } from "../Button/Button"
import deadImageUrl from "./images/dead.png"
import celebrationImageUrl from "./images/celebration.png"
import { Link } from "react-router-dom"
import { postNewLeader } from "../../api"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  
const gameNumber= useSelector(state=>state.game.gameNumber) 
const gameDuration =gameDurationMinutes*60+gameDurationSeconds 

  
  const[userName,setUserName]=useState('Пользователь')
  
  const title = isWon ? (gameNumber===3?"Вы попали на лидерборд":"Вы победили!") : "Вы проиграли!"
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl
  const imgAlt = isWon ? "celebration emodji" : "dead emodji"
// {isWon? (() => postNewLeader(userName,time)):null}

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {(isWon===true) 
      // & gameNumber===3 
      ?<input onChange={(event)=>{setUserName(event.target.value)
        console.log(userName)
        console.log(userName)

        }} className={styles.input} type="text" placeholder= "Пользователь"></input>:null}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
<div onClick={(isWon===true)
  //  & gameNumber===3 
   ?()=>postNewLeader(userName,gameDuration):null}>
      <Button onClick={onClick}>Начать сначала</Button>
</div>
      <Link onClick={(isWon===true)
        //  & gameNumber===3 
         ? ()=>postNewLeader(userName,gameDuration):null} to="/game/leaderboard" > Перейти к лидерборду </Link>
    </div>
  )
}
