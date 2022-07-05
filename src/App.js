import React, { useState, useEffect } from "react";
import MemoryContainers from "./components/memory/MemoryContainer";
import { shuffleArray } from "./utils/shuffleArray";
import "./styles/styles.css";
import { data } from "./data/memoData";
import {
  getUserGames,
  getUser,
  userJoin,
  saveGame,
  getLeatherBoard
} from './services/api'
import TextInput from "./components/shared/TextInput/TextInput";
import Button from "./components/shared/Button/Button";
import moment from 'moment'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState("");
  const [memoData, setMemoData] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(8);
  const [reset, setReset] = useState(true);
  const [user, setUser] = useState(null)
  const [userScores, setUserScores] = useState(null)
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [bestScores, setBestScores] = useState([])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      getUser(userId).then((response) => {
        setUser(response.data)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const getUserPastGames = () => {
    getUserGames(user._id).then(res => {
      setUserScores(res.data.sort((a, b) => a.numberOfTries - b.numberOfTries))
      setIsLoading(false)
    })
    getLeatherBoard().then(response => setBestScores(response.data))
  }

  useEffect(() => {
    if (user) getUserPastGames()
    // avoid infinite loop  
  }, [user])

  const onClickPlayButton = () => {
    setIsLoading(true)
    userJoin(userName)
      .then(res => {
        setUser(res.data)
        localStorage.setItem('userId', res.data._id)
      })
      .catch(err => {
        setUserNameError(err.response.data)
        setIsLoading(false)
      })
  }

  const onSaveGame = (numberOfTries, numberOfPairs) => {
    saveGame({
      userId: user._id,
      numberOfPairs,
      numberOfTries
    }).then(() => getUserPastGames())
  }

  //creates shuffled array of image pairs
  useEffect(() => {
    if (reset) {
      setReset(false);
      let images = [...data];
      let filteredData = theme
        ? images.filter((data) => data.theme.includes(theme))
        : images;
      filteredData = shuffleArray(filteredData).splice(
        0,
        numberOfImages <= filteredData.length
          ? numberOfImages
          : filteredData.length
      );
      filteredData = shuffleArray(filteredData.concat(filteredData));
      setMemoData(
        filteredData.map((items, index) => {
          return {
            ...items,
            index: index,
          };
        })
      );
    }
  }, [theme, reset, numberOfImages]);

  const tryAgain = () => {
    setReset(true);
  };

  const loadingScreen = (
    <div
      style={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      Loading...
    </div >)

  const userInput = (
    <div id="main-container">
      <div
        style={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div>
          <TextInput
            title='Your name'
            placeholder='Enter your name'
            error={userNameError}
            onChange={e => setUserName(e.target.value)}
          />
          <Button title={'Play'} onClick={onClickPlayButton} />
        </div>
      </div>
    </div>
  )


  return (
    <div id="main-container">
      {isLoading ? loadingScreen : user ? (
        <>
          <h1>The memory game</h1>
          {userScores.length && (
            <h3>Your best score: {userScores[0].numberOfTries} tries</h3>
          )}
          <h5>Find pairs of cards</h5>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <div style={{ width: 200 }}>
              <h3>Your best scores</h3>
              {userScores.length
                ? userScores.map(score => (
                  <div key={score._id}>
                    {moment(score.createdAt).format('YY-MM-DD')}: {score.numberOfTries} tries
                  </div>
                ))
                : <div>Play your first game</div>}
            </div>
            <div id="content">
              <MemoryContainers
                memoData={memoData}
                onTryAgain={tryAgain}
                onSaveGame={onSaveGame}
              />
            </div>
            <div style={{ width: 200 }}>
              <h3>LeatherBoard</h3>
              {bestScores.length
                ? bestScores.map((score, index) => {
                  const isCurrentUser = score._id === user._id
                  return (
                    <div
                      key={score._id}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        color: score._id === user._id ? 'red' : null,
                        marginBottom: 8
                      }}>
                      {index + 1} - {isCurrentUser ? (<div>You</div>) : score.name}: {score.numberOfTries} tries
                    </div>
                  )
                })
                : <div>No one has playd the game yet</div>}
            </div>
          </div>
        </>
      ) : userInput}
    </div>
  );
}

export default App;
