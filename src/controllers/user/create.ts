import User from "../../services/user";

export default async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) res.status(404).send("Please provide email and password");

       await User.register({
            email,
            password
        });

       res.send({
           email,
           password
       })
    } catch (e) {
        res.status(404).send(e.message);
    }
}