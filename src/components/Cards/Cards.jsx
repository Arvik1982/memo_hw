import { indexOf, shuffle } from "lodash"
import { useEffect, useState } from "react"
import { generateDeck } from "../../utils/cards"
import styles from "./Cards.module.css"
import { EndGameModal } from "../../components/EndGameModal/EndGameModal"
import { Button } from "../../components/Button/Button"
import { Card } from "../../components/Card/Card"
import { useDispatch, useSelector } from "react-redux";
import { setGamePaused } from "../../store/sliceGame"




// Игра закончилась
const STATUS_LOST = "STATUS_LOST"
const STATUS_WON = "STATUS_WON"
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS"
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW"
//
let paused;

function getTimerValue(startDate, endDate) {
  
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    }
  }

  if (endDate === null) {
    endDate = new Date()
  }

 if(paused===true){  

 const diffInSecconds = Math.floor((endDate.getTime()-5000 - startDate.getTime()) / 1000)
 const minutes = Math.floor(diffInSecconds / 60)
 const seconds = diffInSecconds % 60

 return {
   minutes,
   seconds,
 }}
  
  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
  const minutes = Math.floor(diffInSecconds / 60)
  const seconds = diffInSecconds % 60
  
  return {
    minutes,
    seconds,
  }
  
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
 


export function Cards({ pairsCount = 3, previewSeconds = 5 }) {




  const superPowerA = useSelector(state=>state.game.superPowerA)
  const superPowerB = useSelector(state=>state.game.superPowerB)
  
 
  const dispatch = useDispatch()
  
  // режим 3 ошибки статус
  const gameLightRegime = useSelector(state=>state.game.gameRegime)
  let attemptCounter
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([])
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW)
  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null)
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null)
  //счетчик попыток игры
  const [attempts, setAttempts] = useState('')
  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  })
  //время паузы при суперсилах
  const [pause, setPause]=useState(300)
    
//стейт для суперсилы А
const[usedA, setUsedA]=useState(false)
paused = usedA

//стейт для суперсилы Б
const[usedB, setUsedB]=useState(false)

//отключение рендом пары на время открытия всех карт
const[randomPairBlocked, setRandomPairBlocked]=useState('')

  function handleClickOpenNextCard(card){
  if(gameLightRegime) {!attemptCounter<= 0? restartAttempt(card):{}}
}

  function restartAttempt(card) {
    
    const newCards = cards.map(item=>{
    if(item.id===card.id) {return {...item,open:true} }
    return {...item,open:false}
    })
    setCards(newCards)
  }


  function finishGame(status = STATUS_LOST) {
    
    setGameEndDate(new Date())
    setStatus(status)
  }

  function startGame() {
    
    const startDate = new Date()
    setGameEndDate(null)
    setGameStartDate(startDate)
    setTimer(getTimerValue(startDate, null))
    setStatus(STATUS_IN_PROGRESS)
  }
  function resetGame() {
    
    setUsedA(false)
    setUsedB(false)
    
    setGameStartDate(null)
    setGameEndDate(null)
    setTimer(getTimerValue(null, null))
    setStatus(STATUS_PREVIEW)
  }
  function superPowerOpenCardsAll(){ 
  setRandomPairBlocked(true)                                   //OPEN ALL
  
  setPause(5000)

  let newCardsOpened;
  let resultNewCards;
  let lastCards;

newCardsOpened=cards.map(item=>{
if(item.open===true)return {...item,opened:true}
  return{...item,opened:false}
})
resultNewCards = newCardsOpened.map(item=>{
  return {...item,open:true}
})
setCards(resultNewCards)
setTimeout(()=>{lastCards = resultNewCards.map(item=>{
    if(!item.opened===true)return {...item, open:false}
    return{...item, open:true}
     })
    setCards(lastCards);
    setRandomPairBlocked(false)
    setPause(300);
},5000)
    
}

function superPowerOpenCardsRandomPair(){                               //RANDOM PAIR

let indexArr=[]
let randomCardIndex;
let randomCard;
let newArrRandomOneCard=[];
let newArrRandomTwoCards=[];

for (let i=0; i<=cards.length-1; i++){
  if(cards[i].open!==true){
  
indexArr=[...indexArr,cards.indexOf(cards[i])]
randomCardIndex=indexArr[Math.floor(Math.random()*indexArr.length)]

  }
  
}

randomCard=cards[randomCardIndex]

newArrRandomOneCard=cards.map(item=>{
    if(item.id===randomCard.id)
    return {...item,open:true}
    return {...item}
  })

newArrRandomTwoCards=newArrRandomOneCard.map(item=>{
  if(item.suit === randomCard.suit & item.rank === randomCard.rank )
  return {...item,open:true}
  return {...item}
})
 setCards(newArrRandomTwoCards)   
   
}
  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
   
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {

      return 
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      
      if (card.id !== clickedCard.id) {
        
        return card
      }

      return {
        ...card,
        open: true,
      }
    })
    setCards(nextCards)
    const isPlayerWon = nextCards.every(card => card.open)
    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON)
      return
    }
    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open)
    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank)

      if (sameCards.length < 2) {
        return true
      }

      return false
    })

    const playerLost = openCardsWithoutPair.length >= 2

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары



    if (playerLost) {
      
      setAttempts(attempts - 1)
      attemptCounter = attempts
      if(gameLightRegime){
      attemptCounter <= 0 ? finishGame(STATUS_LOST) :{}

      }
      else{finishGame(STATUS_LOST)}
      return
    }

    // ... игра продолжается
  }
  const isGameEnded = status === STATUS_LOST || status === STATUS_WON

  

  // Игровой цикл
  useEffect(() => {
    
    setAttempts(2)
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно")
      return
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10))
    })

    const timerId = setTimeout(() => {
      startGame()
    }, previewSeconds * 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [status, pairsCount, previewSeconds])

  // Обновляем значение таймера в интервале
  useEffect(() => {
    
        const intervalId = setInterval(() => {
        
        setTimer(getTimerValue(gameStartDate, gameEndDate))
        
        }, pause)
  
      return () => {
      clearInterval(intervalId);
      
      }
  
  }, [gameStartDate, gameEndDate,pause])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
     
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p  className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS ?
        
        
        <div className={styles.superpower}>
      
          <button onClick={()=>{superPowerOpenCardsAll(); setUsedA(true)}} 
          className={superPowerA==='a'?(!usedA?styles.superpower__select_elementA:styles.display):styles.display}>
            </button>
      
            <button disabled={randomPairBlocked} onClick={()=>{superPowerOpenCardsRandomPair(); setUsedB(true)}} 
             className={superPowerB==='b'?(!usedB?styles.superpower__select_elementB:styles.display):styles.display} >
              </button>
              
              
              </div> : null}
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>

      <div className={styles.cards}>
   
        {cards.map(card => (
          
          <Card
            key={card.id}
            onClick={() => {
           
            openCard(card); 
            handleClickOpenNextCard(card);
            
            }}
            open= {status !== STATUS_IN_PROGRESS? true :card.open} 
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}

<div className={!gameLightRegime?styles.display:{}}>
        <div className={styles.attempts}>
          <h2>Число попыток:</h2> <h2>{attempts+1}</h2>
          </div>
        </div>


    </div>
  )
}
