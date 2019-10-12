module.exports = function(app) {
    
    var userController = require('../controllers/userController');
  
    app.route('/api/registration')
      .post(userController.registration);
    
    app.route('/api/login')
      .post(userController.login);

};