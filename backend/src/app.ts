import * as express from 'express';
import * as cors from 'cors';
import * as model from './databaseRepository/model';
import { DBManagement } from './DBManagement';


// TODO: Get promise from DBManagement class and call
// mountRoutes() on a successful response.
class App {
    public express: express;
    public router: express.Router;
    private db: DBManagement;

    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use(express.json());
        this.router = express.Router();
        this.db = new DBManagement();
        this.waitForDBConnection();
    }

    private waitForDBConnection(): void {
        this.db.attemptConnection().then(
            () => {
                console.log('Successfully connected to database.');
                this.mountRoutes();
            },
            err => console.log('There was an error connecting to the database:', err)
        );
    }

    private mountRoutes(): void {
        this.monitorBase();
        this.monitorCreateAccount();
        this.monitorGetUser();
        this.express.use('/', this.router)
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