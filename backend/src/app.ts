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
        this.monitorLogin();
        this.monitorCreateAccount();
        this.monitorGetUser();
        this.express.use('/', this.router)
    }

    private mountBackupRoutes(): void {
        this.express.all('*', (req, res) => {
            res.status(500);
            res.json({
                success: false,
                message: 'There was an internal server error'
            });
        });
    }

    private monitorBase(): void {
        this.router.get('/', (req, res) => {
            res.json({
                success: true,
                message: 'Connected to backend successfully!'
            });
        });
    }

    private monitorLogin(): void {
        this.router.post('/login', (req, res) => {
            const user = req.body;
            model.User.find({email: user.email}, (err, users) => {
                if (err) {
                    console.error(err);
                    res.json({
                        success: false,
                        message: 'There was an error logging in'
                    });
                }

                if (users.length < 1) {
                    console.log('Login unsuccessful, no user found');
                    res.json({
                        success: false,
                        message: 'No user found'
                    });
                }

                console.log('Found user', users[0].email);
                res.json(users[0]);
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