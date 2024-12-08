import {create} from 'zustand'
import axios from 'axios'
import Cookies from 'js-cookie'

const TeamStore = create((set) => ({

    TeamList : null,
    TeamListRequest : async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/Read-Team')
            const data = await response.data;
            set({TeamList : data})
        } catch (error) {
            console.error('Error fetching team list:', error)
        }
    },


    // Create a new Team
    CreateTeamFormValue : {name : '', designation : '', img : '', bio : ''},

    CreateTeamFormOnChange : (name, value) => {
        set((state) => ({
            CreateTeamFormValue: {
                ...state.CreateTeamFormValue,
                [name]: value
            }
        }))
    },


    CreateTeamRequest : async (postBody) => {
        try {
            let response = await axios.post(`http://localhost:8000/api/Create-Team`, postBody, {
                headers: {
                    token: Cookies.get('token')
                }
            });
            return response.data;
        } catch (e) {
            console.error('Error creating service:', e)
        }
    },


    // Remove a Team
    DeleteTeam : async (id) => {
        try {
            await axios.post(`http://localhost:8000/api/Delete-Team`, {id : id}, {
                headers: {
                    token: Cookies.get('token')
                }
            });
        } catch (e) {
            console.error('Error deleting:', e)
        }
    },




    // Update a Team
    UpdateTeamRequest : async (postBody) => {
        try {
            await axios.post(`http://localhost:8000/api/Update-Team`, postBody , {
                headers: {
                    token: Cookies.get('token')
                }
            });
        } catch (e) {
            console.error('Error updating:', e)
        }
    }

    
}))


export default TeamStore;