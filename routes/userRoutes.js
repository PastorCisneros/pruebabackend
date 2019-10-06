module.exports = function(app) {
    
    var userController = require('../controllers/userController');
  
    app.route('/api/insertUser')
      .post(userController.insertUser);

};