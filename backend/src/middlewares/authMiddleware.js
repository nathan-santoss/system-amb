import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization'] // procura pela chave dentro chamada 'authorization'
        
        if(!tokenHeader) return res.status(403).json({ message: "Acesso negado. Nenhum crachá (token) fornecido." })
        
        const token = tokenHeader.split(' ')[1]
        const validacao = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = validacao
        next()
    } catch (error) {
        return res.status(403).json({ message: "Acesso negado. Token inválido ou expirado." })
    }
}