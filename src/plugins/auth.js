var jwt = require("jsonwebtoken");
import axios from "axios";
export async function login_auth(params) {
    try {
        let res = {
            token: "",
            user: null,
            expire: ""
        }
        let token = await params.data.access_token;
        let user_from_token = jwt.verify(token, process.env.VUE_APP_DCRYPT_SECRET);
        //let user_from_token = jwt.verify(token, 'EDUVALOR');
        let expire = new Date((await user_from_token.exp) * 1000);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        let user = await axios.get(
            process.env.VUE_APP_BACKEND_API + "/authentication/me",
            //"https://www.eduvalor.ml/backendDev/authentication/me",
            config
        );

        res.token = token
        res.user_id = user_from_token.user_id
        res.expire = expire
        res.user = user.data
        return res
    } catch (error) {
        console.log(`cannot login : ${error}`);
    }

}