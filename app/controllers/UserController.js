import { registerService, LoginService, readProfileService, updateProfileService, VerifyLoginService } from '../service/UserService.js';


// User Registration
export const Registration = async (req, res) => {
    try {
        let result = await registerService(req);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// User Login
export const Login = async (req, res) => {
    try {
        let result = await LoginService(req, res);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// Verify Login
export const VerifyLogin = async (req,res) => {
    try {
        let result = await VerifyLoginService(req);
        if (result.status === 'success') {
            let cookiesOptions = {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                httpOnly: false
            }
            res.cookie('token', result.token, cookiesOptions);
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result)
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};


// User Profile Read
export const ReadProfile = async (req, res) => {
    let result = await readProfileService(req);
    return res.json(result);
};


// User Update Profile
export const UpdateProfile = async (req, res) => {
    let result = await updateProfileService(req);
    return res.json(result);
}