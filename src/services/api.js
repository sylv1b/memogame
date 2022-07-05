import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const getUserGames = (userId) => api.get(`/game/user/${userId}`)

export const userJoin = (userName) => api.post('/user', {
    user: userName
})

export const getUser = (userId) => api.get(`/user/${userId}`)

export const saveGame = (gameData) => api.post('/game', { ...gameData })

export const getLeatherBoard = () => api.get('/game/leatherboard')