(function () {
  angular.module('reddit-clone')
    .service('UserService', ['$http', function service($http) {
      const self = this;
      self.session = {
        id: null,
      };

      self.login = function login(username, password) {
        return $http.post('/users/login', {
          username,
          password,
        }).then((response) => {
          self.session.id = response.data;
        });
      };

      self.logout = function logout() {
        $http.delete('/users/logout').then(() => {
          self.session.id = null;
        });
      };

      self.register = function register(username, password) {
        return $http.post('/users/register', {
          username,
          password,
        }).then(() => {

        });
      };
    }]);
}());
