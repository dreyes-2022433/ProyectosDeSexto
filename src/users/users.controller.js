import User from "./users.model.js"
import {  encrypt , checkPassword} from '../../utils/encrypt.js'
//Esto es para el admin
export const registerUser = async(req, res)=>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err})
    }
}

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.body
        const newdata = req.body
        if(newdata.password){
            return res.send({message: 'cannot update a user password'})
            
        }
        const data = await User.findByIdAndUpdate(id,newdata,{ new: true })

        if(!data) return res.status(404).send({succes: false, message: 'User not foudn'})
            return res.send({
        succes: true,
        message: 'user updated', data})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with updating an user', err})
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const id = req.user.uid
        const newdata = req.body
        if(newdata.password){
            return res.send({message: 'cannot update your password'})
            
        }
        const data = await User.findByIdAndUpdate(id,newdata,{ new: true })

        if(!data) return res.status(404).send({succes: false, message: 'User not foudn'})
            return res.send({
        succes: true,
        message: 'user updated', data})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with updating an user', err})
    }
}

export const findAllUsers = async(req, res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
        let users = await User.find({status:true})
        .skip(skip)
        .limit(limit)
        if(users.length === 0) return res.status(404).send({message: 'No users found'})
        return res.send({message: 'Users found', users})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}
export const deleteUser = async(req, res)=>{
    try {
        let id = req.body.id 
        let deleteUser = await User.findByIdAndUpdate(
            id,
            { status: User.status = false },
            { new: true }
        )
        if(!deleteUser) return res.status(404).send({ message: 'User not found' })
            return res.send({ message: 'User deleted', deleteUser })
    } catch (err) {
        console.log('Error deleting user', err)
        return res.status(500).send({ message: 'General error', err })
    }

}

export const deleteOwnUser = async (req, res)=>{
    try{
        let {password} = req.body
        let idUser = req.user.uid
        let user = await User.findById(idUser)
        if(await checkPassword(user.password, password)){
            let deleteUser = await User.findByIdAndUpdate(
                idUser,
                { status: User.status = false },
                { new: true }
                
            )
            return res.send({message: 'deleted succesfully: ',deleteUser})
        }
            
            return res.send({message:'the password is incorrect'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}

//Creacion del administrador

export const createAdmin = async()=>{
    let admin = await User.findOne({username: 'dreyes'})
    let passEncryp = await encrypt('Diego-15.!')
    if(!admin)
        admin = await User.create({
        name: 'Diego ',
        surname: 'Reyes',
        username: 'dreyes',
        email: 'dreyes-2022433@kinal.edu.gt',
        password : passEncryp,
        phone : '32124569',
        role: 'ADMIN'
    })
    
}
