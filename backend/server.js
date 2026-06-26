import express from 'express';
import cors from 'cors';
import database from './src/config/database.js';

// Importação dos Modelos
import Funcionario from './src/models/funcionarios.js';
import Atendimento from './src/models/atendimento.js';
import Alergia from './src/models/alergias.js';
import Atestado from './src/models/atestados.js';
import Usuario from './src/models/usuarios.js';

// Importação das Rotas
import funcionarioRoutes from './src/routes/funcionarioRoutes.js';
import atendimentoRoutes from './src/routes/atendimentoRoutes.js';
import alergiaRoutes from './src/routes/alergiaRoutes.js';
import atestadoRoutes from './src/routes/atestadoRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// criacao de usuario master
import criarUsuarioMaster from './src/config/masterUser.js'

const app = express();

// Libera a porta para o React conversar com o Node (CORS)
app.use(cors());

// Configura o Express para ler e enviar JSON
app.use(express.json());

//Rotas da API
app.use(funcionarioRoutes);
app.use(atendimentoRoutes);
app.use(alergiaRoutes);
app.use(atestadoRoutes);
app.use(authRoutes);

// Rota Inicial (devolve um JSON)
app.get('/', (req, res) => {
    res.json({ status: "Online", mensagem: "API do Ambulatório rodando perfeitamente!" });
});

// Conecta no Banco e Liga o Servidor com Retentativa Automática
async function iniciarServidor() {
    while (true) {
        try {
            await database.sync({ alter: true });

            console.log("Banco de dados sincronizado com sucesso!");

            await criarUsuarioMaster();

            app.listen(3000, () => {
                console.log("Servidor Back-end rodando na porta 3000");
            });
            break;
        } catch (erro) {
            console.error("Erro ao sincronizar banco:", erro.message);
            console.log("Tentando novamente em 5 segundos...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

iniciarServidor();