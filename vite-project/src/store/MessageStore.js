import {create} from 'zustand'
import axios from 'axios'
import Cookies from 'js-cookie'


const MessageStore = create((set) => ({

    MessageList : null,
    MessageListRequest : async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/Read-Message', {
                headers: {
                    token: Cookies.get('token')
                }
            })
            let data =  response.data;
            set({MessageList : data})
        } catch (error) {
            console.error('Error fetching massage list:', error)
        }
    },


    // Remove a massage
    DeleteMassage : async (id) => {
        try {
            await axios.post(`http://localhost:8000/api/Delete-Message`, {id : id}, {
                headers: {
                    token: Cookies.get('token')
                }
            });
        } catch (e) {
            console.error('Error deleting:', e)
        }
    }

    
}))


export default MessageStore;