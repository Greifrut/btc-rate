import User from "../../services/user";

export default (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    if (!email || !password) return false;

    User.login({
        email,
        password
    })
}