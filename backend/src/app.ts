import * as express from 'express';
import * as model from './database/model';

class App {
    public express: express;
    public router: express.Router;

    constructor() {
        this.express = express()
        this.router = express.Router();
        this.mountRoutes()
    }

    private mountRoutes(): void {
        this.monitorBase();
        this.monitorCreateAccount();
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
}

// app.post('/create-account', (req, res) => {
//     const user = req.body;

//     const newUser = new model.User(user);

//     newUser.save((err, user) => {
//         if (err) return console.err(err);
//         console.log('Created new user');

//         res.json(user);
//     })
// });

// app.post('/login', (req, res) => {
//     res.json({
//         success: true
//     })
// });

export default new App().express