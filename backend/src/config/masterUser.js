import bcrypt from 'bcryptjs'
import Funcionario from '../models/funcionarios.js'
import Usuario from '../models/usuarios.js'

async function criarUsuarioMaster() {
    try {
        const usuarioExiste = await Usuario.findOne({ where: { id: 1 } })

        if (!usuarioExiste) {
            console.log("⏳ Criando usuário master padrão para testes...")

            const funcionarioExiste = await Funcionario.findByPk('admin123')
            if (!funcionarioExiste) {
                await Funcionario.create({
                    matricula: 'admin123',
                    nome: 'Avaliador',
                    cpf: '00000000000',
                    cargo: 'Chefe',
                    setor: 'Administração'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const senhaHash = await bcrypt.hash('senha123', salt)

            await Usuario.create({
                id: 1,
                email: 'admin123@12345',
                senha: senhaHash
            })

            console.log("Usuário master criado com sucesso! [Matrícula: admin123 | Senha: senha123]")
        } else {
            console.log("✅ Usuário master já configurado no banco de dados.")
        }
    } catch (error) {
        console.error("Falha crítica ao inicializar usuário master:", error)
    }
}

export default criarUsuarioMaster