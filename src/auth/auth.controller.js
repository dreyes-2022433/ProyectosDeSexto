
import User from "../users/users.model.js"
import Cart from "../cart/cart.model.js"
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'


export const register = async(req, res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Aquí van validaciones
        let user = new User(data)
        //Encriptar la password
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        user.role = 'CLIENT'
        //Guardar
        await user.save()
        //Responder al usuario
        let cartUser = await new Cart({user:user._id})

        await cartUser.save()
        return res.send({message: `Registered successfully, can be logged with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) 
        if(user.status == false){
            return res.send({message: 'this User is currently disable, contact with an admin.'})
        }
        //findOne({username}) = ({username: username})
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = { //No puede ir data sensible
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            //PENDIENTE: generar el Token
            let token = await generateJwt(loggedUser)
            //Responder al usuario
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}
