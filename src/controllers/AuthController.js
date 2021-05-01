export default class AuthController{
    static async signup(req, res){
        res.status(200).json(
            {
                message: "You are about to Authenticate!",
            }
        )
    }
}