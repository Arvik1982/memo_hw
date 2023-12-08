import { Link } from "react-router-dom"
import styles from "./LeaderPage.module.css"
import { getLeaders } from "../../api"
import { useEffect } from "react"
import { useState } from "react"
import { unary } from "lodash"

export function LeadersPage() {
  const [leaders, setLeaders] = useState()

  useEffect(() => {
    getLeaders()
      .then((data) => {
        let sortLeaders = data.leaders.sort((el, el2) => el.time - el2.time)
        let length = sortLeaders.length

        for (let i = 1; i < length; i++) {
          sortLeaders.forEach((el) => {
            {
              {
                el.position = i++
              }
            }
          })
        }

        return sortLeaders
        // setLeaders(sortLeaders)
      })
      .then((sortLeaders) => {
        let newLeaders
        let length = sortLeaders.length
        let key = "achievements"
        let hasKey
        for (let i = 1; i < length; i++) {
          newLeaders = sortLeaders.map((el) => {
            {
              hasKey = Reflect.has(el, key)
              if (hasKey === false) {
                return { ...el, achievements: [0, 0] }
              }
              return { ...el }
            }
          })
        }
        setLeaders(newLeaders)
      })
  }, [])
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.text}>Лидерборд</h1>
        <Link to="/">
          <button className={styles.button}>Начать игру</button>{" "}
        </Link>
      </div>
      <div className={styles.table__header}>
        <h3 style={{ fontWeight: "100" }}>Позиция</h3>
        <h3 style={{ fontWeight: "lighter" }}>Пользователь</h3>

        <h3 style={{ fontWeight: "lighter" }}>Достижения</h3>
        <h3 style={{ fontWeight: "lighter" }}>Время</h3>
      </div>
      {leaders
        ? leaders.map((el, index) => {
            return (
              <div key={index} className={styles.table}>
                <h2>#{el.position}</h2>
                <h2 style={{ position: "absolute", left: "30%" }}>{el.name}</h2>
                <div className={styles.achievements__block}>
                  <div
                    className={
                      el.achievements[1] !== 2
                        ? styles.achievements__block_notpowered
                        : styles.achievements__block_powered
                    }
                  ></div>
                  <div
                    className={
                      el.achievements[0] === 1
                        ? styles.achievements__block_notsuper
                        : styles.achievements__block_super
                    }
                  ></div>
                </div>
                <h2>
                  {Math.floor(el.time / 60)}:
                  {el.time - Math.floor(el.time / 60) * 60}
                </h2>
              </div>
            )
          })
        : null}
    </>
  )
}
