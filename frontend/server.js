import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
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

app.get('/logout', (req, res) => {
    res.render('login'); 
});


app.listen(PORT, () => {
    console.log(`Servidor de Interface (EJS) a correr na porta ${PORT}`);
});