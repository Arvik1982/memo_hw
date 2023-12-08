const route = 'https://wedev-api.sky.pro/api/leaderboard'
const routeAchieves = 'https://wedev-api.sky.pro/api/v2/leaderboard'

let hardRegime;
let achievementsArr;
let achieveUsed;

export function setVariables(userName,time,achieveA,achieveB,hardReg){

if(achieveA==='a'||achieveB==='b'){achieveUsed=1}else{achieveUsed=0}
if(hardReg===false ){hardRegime=2} else{hardRegime=0}   //если хард режим фолс то это два - так должно быть.
achievementsArr=[achieveUsed,hardRegime]
}
export async function getLeaders(){
const response = await fetch(routeAchieves,   
    {
    method: "GET",
})
const data = await response.json()
return data
}
export async function postNewLeader(userName,time,superPowerA,superPowerB, gameHardRegime){
    
    setVariables(userName,time,superPowerA,superPowerB, gameHardRegime)
    const response = await fetch(routeAchieves,   
        {
        method: "POST",
        body: JSON.stringify({
            name: `${userName}`,
            time: `${Number(time)}`,
            achievements:achievementsArr,
        }),
    })
    const data = await response.json()
    return data
    }