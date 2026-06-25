import bcrypt from 'bcryptjs'
import Funcionario from '../models/funcionarios.js'
import Usuario from '../models/usuarios.js'

export async function criarUsuarioMaster() {
    try {
        const usuarioExiste = await Usuario.findOne({ where: { matricula: 'admin123' } })

        if (!usuarioExiste) {
            console.log("⏳ Criando usuário master padrão para testes...")

            const funcionarioExiste = await Funcionario.findByPk('admin123')
            if (!funcionarioExiste) {
                await Funcionario.create({
                    matricula: 'admin123',
                    nome: 'Professor / Avaliador',
                    cpf: '000.000.000-00',
                    cargo: 'Enfermeiro Chefe',
                    setor: 'Administração'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const senhaHash = await bcrypt.hash('senha123', salt)

            await Usuario.create({
                matricula: 'admin123',
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