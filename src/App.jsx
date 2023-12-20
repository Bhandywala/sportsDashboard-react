import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [newplayer, setNewplayer] = useState("")
  const [newplayerAge, setNewplayerAge] = useState('')
  const [data, setData] = useState([])

  const url = "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e"


  useEffect(() => {
    axios.get(url)
      .then((resp) => {
        setData(resp.data)
      })
  }, [])


  const handleName = (e) => {
    setNewplayer(e.target.value)
  }
  const handleAge = (e) => {
    setNewplayerAge(e.target.value)
  }
  const handleClick = (s_id, t_id) => {
    let players = data[s_id]["teams"][t_id]["players"];
    const newObject = { name: newplayer, age: newplayerAge };
    players.unshift(newObject)
    let r_data = data
    r_data[s_id]["teams"][t_id]["players"] = players
    setData([...r_data])
    
  }
  return (
    <div className='container'>
      {data.map((sports, index) => (
        <div className='sports' key={index}>
          <h2>{sports.game}</h2>
          {sports.teams.map((team, ind) => (
            <div className='teams' key={ind}>
              <p>{team.team_name}</p>
              <input type="text"  onChange={handleName} />
              <input type="text"  onChange={handleAge} /><button onClick={() => { handleClick(index, ind) }}>Add</button>
              {
                team.players.map((player, i) => (
                  <>
                    <li className='players' key={i}>
                      <input type="text" value={player.name} />
                      <input type="text" value={player.age} /> <button>Save</button>
                    </li>
                  </>
                ))
              }
            </div>))}
        </div>
      ))}
    </div>
  )
}

export default App
