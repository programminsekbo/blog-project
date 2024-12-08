import {create} from "zustand";
import axios from "axios";
import Cookie from "js-cookie";
import Cookies from "js-cookie";



const UserStore = create((set) => ({

    isLogin : () => {
        return !!Cookie.get('token')
    },


    RegisterFormValue : {firstName : '', lastName : '', phone : '', email : '', password : '',},

    RegisterFormOnChange : (name, value) => {
        set((state) => ({
            RegisterFormValue: {
                ...state.RegisterFormValue,
                [name]: value
            }
        }))
    },


    // Register Request-
    RegisterRequest : async (postBody) => {
        try {
            let response = await axios.post(`http://localhost:8000/api/Registration`, postBody);
            return response.data;
        } catch (e) {
            console.error('Error registering user:', e)
        }
    },



    LoginFormValue : {email : '', password : ''},

    LoginFormOnChange : (name, value) => {
        set((state) => ({
            LoginFormValue: {
                ...state.LoginFormValue,
                [name]: value
            }
        }))
    },


    // Login Request
    LoginRequest : async (postBody) => {
        try {
            let response = await axios.post(`http://localhost:8000/api/Login`, postBody);
            sessionStorage.setItem('email', postBody.email);
            return response.data;
        } catch (e) {
            console.error('Error registering user:', e)
        }
    },



    OtpFormValue : {otp : ''},

    OtpFormOnChange : (name, value) => {
        set((state) => ({
            OtpFormValue: {
                ...state.OtpFormValue,
                [name]: value
            }
        }))
    },

    
    // Otp Verify
    VerifyLoginRequest : async (otp) => {
        try {  
            let email = sessionStorage.getItem('email');
            let response = await axios.post(`http://localhost:8000/api/VerifyLogin`, {email: email, otp: otp});
            Cookie.set('token', response.data.token);
            return response.data
        } catch (e) {
            console.error('Error verifying OTP:', e)
        }
    },


    // User Logout Request
    LogoutRequest : async () => {
        let response = await axios.get(`http://localhost:8000/api/Logout`, {
            headers : {
                token: Cookies.get('token')
            }
        });
        set({isFormSubmit: false});
        return response.data['status'] === 'success';
    },



    // ProfileForm : {
    //     cus_add: "",
    //     cus_city : "",
    //     cus_country : "",
    //     cus_fax : "",
    //     cus_name : "",
    //     cus_phone : "",
    //     cus_postcode : "",
    //     cus_state : "",
    //     ship_add : "",
    //     ship_city : "",
    //     ship_country : "",
    //     ship_name : "",
    //     ship_phone : "",
    //     ship_postcode : "",
    //     ship_state : ""
    // },
    // ProfileFormOnChange : (name, value) => {
    //     set((state) => ({
    //         ProfileForm: {
    //             ...state.ProfileForm,
    //             [name]: value
    //         }
    //     }))
    // },


    // User Profile Details
    // ProfileDetails : null,
    // ProfileDetailsRequest : async () => {
    //     try {
    //         let response = await axios.get(`http://localhost:5050/api/ReadUserProfile`, {
    //             headers: {
    //                 token: Cookies.get('token')
    //             }
    //         })
    //         if (response.data['data'].length > 0) {
    //             set({ProfileDetails : response.data['data'][0]});
    //             set({ProfileForm : response.data['data'][0]});
    //         } else {
    //             set({ProfileDetails : []});
    //         }
    //     } catch (err) {
    //         unauthorized(err.response.status);
    //     }
    // },


    // ProfileUpdateRequest : async (PostBody) => {
    //     try {
    //         set({ProfileDetails : null});
    //         let response = await axios.post(`http://localhost:5050/api/UpdateUserProfile`, PostBody, {
    //             headers: {
    //                 token: Cookies.get('token')
    //             }
    //         });
    //         return response.data['status'] === 'success';
    //     } catch (err) {
    //         unauthorized(err.response.status);
    //     }
    // },


}));

export default UserStore;