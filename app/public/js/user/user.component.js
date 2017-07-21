(function () {
  angular.module('reddit-clone')
    .component('user', {
      controller: UserController,
      templateUrl: '/js/user/user.template.html',
    });

  UserController.$inject = ['UserService'];

  function UserController(UserService) {
    const vm = this;
    vm.session = {
      id: null,
      username: null,
    };

    vm.login = function login() {
      UserService.login(vm.username, vm.password).then(() => {
        vm.session.id = UserService.session.id;
        vm.session.username = vm.username;
        vm.username = '';
        vm.password = '';
      });
    };

    vm.logout = function logout() {
      UserService.logout();
      vm.session.id = null;
      vm.session.username = null;
    };

    vm.register = function register(username, password) {
      UserService.register(username, password);
    };
  }
}());
