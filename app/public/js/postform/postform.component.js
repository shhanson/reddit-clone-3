(function () {
  angular.module('reddit-clone')
    .component('postform', {
      controller: PostformController,
      templateUrl: '/js/postform/postform.template.html',
    });

  PostformController.$inject = ['PostsService', 'UserService', '$stateParams', '$state'];

  function PostformController(PostsService, UserService, $stateParams, $state) {
    const vm = this;
    vm.tempPost = {};

    vm.$onInit = function onInit() {
      vm.postId = $stateParams.postId;
      vm.editPostClicked = $stateParams.editPostClicked;
      vm.newPostClicked = $stateParams.newPostClicked;

      if (vm.editPostClicked) {
        PostsService.getPost(vm.postId).then((response) => {
          vm.tempPost = response.data;
        });
      }
    };

    vm.loggedIn = function loggedIn() {
      return !!(UserService.session.id);
    };


    vm.submitForm = function submitForm() {
      if (vm.newPostClicked) {
        PostsService.addPost(vm.tempPost);
        vm.tempPost = {};
        $state.go('posts');
        return;
      }

      if (vm.editPostClicked) {
        PostsService.updatePost(vm.postId, vm.tempPost);
        vm.tempPost = {};
        $state.go('posts');
        return;
      }
    };
  }
}());
