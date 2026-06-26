import Usuario from "../models/usuarios.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const cadastrar = async (req, res) => {
    const { email, senha } = req.body
    try {
        const saltRounds = 10
        const senhaHash = await bcrypt.hash(senha, saltRounds)
        await Usuario.create({ email, senha: senhaHash })
        res.status(201).json({ message: 'Usuário criado com sucesso!' })
    } catch (error) {
        console.error("ERRO NO CADASTRO:", error)
        res.status(500).json({ error: "Erro ao criar usuário", details: error.message })
    }
}

export const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." })
    }

    try {
        console.log("Tentativa de login para:", email)
        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' })

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta" })

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )
        res.status(200).json({ token })

    } catch (error) {
        console.error("ERRO DETALHADO NO LOGIN:", error)
        res.status(500).json({ error: "Erro interno no servidor", details: error.message })
    }
}