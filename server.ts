import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

// Routes
import indexRoutes from './routes/indexRoutes';
import BebidasRoutes from './routes/BebidaRoutes';
import CategoriasRoutes from './routes/CategoriasRouter';

class Server {
    public app: express.Application;
    constructor( ) {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/bebidas';
        mongoose.set('useFindAndModify' || process.env.MONGODB_URL, true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('DB is conencted'));

        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //View para el html o ejs
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded( { extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

    }

    routes() {
        //Primary
        // this.app.use(indexRoutes);

        //para el html o ejs
        this.app.get('/', (req, res) => {
            res.render('index');
        });

        //Seconds
        this.app.use('/bebidas', BebidasRoutes);
        // this.app.use('/user', UserRoutes);
        this.app.use('/categorias', CategoriasRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();