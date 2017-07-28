(function () {
  angular.module('reddit-clone')
    .component('register', {
      controller: RegisterController,
      templateUrl: '/js/register/register.template.html',

    });

  RegisterController.$inject = ['UserService', '$state'];

  function RegisterController(UserService, $state) {
    const vm = this;

    vm.isValid = function isValid() {
      return (vm.username && vm.password && vm.password === vm.vpassword);
    };

    vm.register = function register() {
      UserService.register(vm.username, vm.password).then(() => {
        $state.go('posts');
      });
    };
  }
}());
