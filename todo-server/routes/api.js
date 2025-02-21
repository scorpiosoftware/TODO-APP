const AuthController = require("../app/Controllers/AuthController");
const homeController = require("../app/Controllers/HomeController");
const UserController = require("../app/Controllers/UserController");
const middleware  = require("../app/Middlewares/Middlewares");
async function init(app,options){
    app.get('/', homeController.index);
    app.post('/api/auth/login',AuthController.login);

    app.get('/api/users/',{prehandler: [middleware.authenticate]}, UserController.index);
    app.get('/api/user/:id', UserController.show.bind(UserController));
    app.post('/api/user/store/', UserController.store.bind(UserController));
    app.put('/api/user/update/:id', UserController.update);
    app.delete('/api/user/delete/:id', UserController.destroy);


}
module.exports =  init ;