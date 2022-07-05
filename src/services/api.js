import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : 'https://memo-api.captain.brochard.se',
    timeout: 1000,
});

export const getUserGames = (userId) => api.get(`/game/user/${userId}`)

export const userJoin = (userName) => api.post('/user', {
    user: userName
})

export const getUser = (userId) => api.get(`/user/${userId}`)

export const saveGame = (gameData) => api.post('/game', { ...gameData })

export const getLeatherBoard = () => api.get('/game/leatherboard')