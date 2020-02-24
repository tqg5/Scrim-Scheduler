import axios from 'axios'

export default async function getChannel() {
    const { data } = await axios.get('http://localhost:5001/getChannel')

    return data
}

export async function createMessage() {
    
    const { data } = await axios.post('http://localhost:5001/createMessage', {
        test: 'test'
    })
}