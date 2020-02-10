import * as express from 'express';
import * as cors from 'cors';
import * as model from './databaseRepository/model';
import { DBConnection } from './DBConnection';

class App {
    public express: express;
    public router: express.Router;
    private db: DBConnection;

    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use(express.json());
        this.router = express.Router();
        this.db = new DBConnection();
        this.waitForDBConnection();
    }

    private waitForDBConnection(): void {
        this.db.attemptConnection().then(
            () => {
                console.log('Successfully connected to database.');
                this.mountRoutes();
            },
            err => {
                console.log('There was an error connecting to the database:', err);
                this.mountBackupRoutes();
            }
        );
    }

    private mountRoutes(): void {
        this.monitorBase();
        this.monitorCreateAccount();
        this.monitorGetUser();
        this.express.use('/', this.router)
    }

    private mountBackupRoutes(): void {
        this.express.all('*', (req, res) => {
            res.json({
                message: 'There was an error connecting to the database.'
            });
        });
    }

    private monitorBase(): void {
        this.router.get('/', (req, res) => {
            res.json({
                message: 'Connected to backend successfully!'
            });
        });
    }

    private monitorCreateAccount(): void {
        this.router.post('/create-account', (req, res) => {
            const user = req.body;
            const newUser = new model.User(user);

            newUser.save((err, user) => {
                if (err) return console.error(err);
                console.log('Created new user');
        
                res.json(user);
            });
        });
    }

    private monitorGetUser(): void {
        this.router.get('/user', (req, res) => {
            const user = req.query;

            model.User.find({email: user.email}, (err, user) => {
                if (err) return console.error(err);
                console.log('Found user', user[0].email);
                res.json(user);
            });
        });
    }
}

export default new App().express