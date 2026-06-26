import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configura o Express para ler e enviar JSON
app.use(express.json());

// Setup EJS
const frontendDir = path.join(__dirname, '../frontend');
app.set('view engine', 'ejs');
app.set('views', path.join(frontendDir, 'views'));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(frontendDir, 'public')));


//Rotas da API
app.use(funcionarioRoutes);
app.use(atendimentoRoutes);
app.use(alergiaRoutes);
app.use(atestadoRoutes);
app.use('/auth', authRoutes);

// Rotas de renderização de página
app.get('/', (req, res) => {
    res.render('login'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard'); 
});

app.get('/consultar-paciente', (req, res) => {
    res.render('consultar-paciente'); 
});

app.get('/ficha-paciente', (req, res) => {
    res.render('ficha-paciente'); 
});

// Conecta no Banco e Liga o Servidor com Retentativa Automática
async function iniciarServidor() {
    while (true) {
        try {
            await database.sync({ alter: true });

            console.log("Banco de dados sincronizado com sucesso!");

            await criarUsuarioMaster();

            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Servidor unificado rodando na porta ${PORT}`);
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