import User from "../../services/user";

export default (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return false;

    User.login({
        email,
        password
    })
}