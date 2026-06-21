import Usuario from "../models/usuarios.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const cadastrar = async (req, res) => {
    const {email, senha} = req.body

    try {
        // define a segurança da senha (10 = muito boa)
        const saltRounds = 10

        // senha encriptada
        const senhaHash = await bcrypt.hash(senha, saltRounds)

        // criando um usuário com email e senha
        await Usuario.create({
            email,
            senha: senhaHash
        })

        res.status(201).json({message: 'Usuário criado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: `Erro ao criar usuário ${error.message}`})
    }
}

export const login = async (req, res) => {
    const {email, senha} = req.body
    try {
        const usuario = await Usuario.findOne({where: {email}})

        if(!usuario) return res.status(404).json({message: 'Usuário não encontrado.'})
        
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if(!senhaCorreta) return res.status(401).json({message: "Senha incorreta"})
        
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )
        
        res.status(200).json({ 
            message: "Login realizado com sucesso!",
            token: token
        })

    } catch (error) {
        res.status(500).json({ error: `Erro ao fazer login: ${error.message}`})
    }
}