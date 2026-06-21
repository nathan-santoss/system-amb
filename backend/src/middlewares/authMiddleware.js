import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
    try {
        const TokenHeader = req.headers['Authorization']
        
        if(!TokenHeader) return res.status(403).json({ message: "Acesso negado. Nenhum crachá (token) fornecido." })
        
        const token = TokenHeader.split('')[1]
        const validacao = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = validacao
        next()
    } catch (error) {
        
    }
}