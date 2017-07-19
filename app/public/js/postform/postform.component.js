(function () {
  angular.module('reddit-clone')
    .component('postform', {
      controller: PostformController,
      templateUrl: '/js/postform/postform.template.html',
    });

  PostformController.$inject = ['PostsService', '$stateParams', '$scope', '$state'];

  function PostformController(PostsService, $stateParams, $scope, $state) {
    const vm = this;
    vm.tempPost = {};

    $scope.$watch('postForm', (postForm) => {

    });

    vm.$onInit = function onInit() {
      vm.postId = $stateParams.postId;
      vm.editPostClicked = $stateParams.editPostClicked;
      vm.newPostClicked = $stateParams.newPostClicked;
      vm.post = $stateParams.post;
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
