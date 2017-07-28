(function () {
  angular.module('reddit-clone')
    .component('post', {
      controller: PostController,
      templateUrl: './static/js/post/post.template.html',
      bindings: {
        post: '<',
      },
    });

  PostController.$inject = ['PostsService'];
  function PostController(PostsService) {
    const vm = this;
    //
    // vm.loggedIn = function loggedIn() {
    //   return !!(UserService.session.id);
    // };

    vm.upvote = function upvote() {
      // if (vm.loggedIn()) {
      PostsService.upvote(vm.post.id);
      // }
    };

    vm.downvote = function downvote() {
      if (vm.post.vote_count > 0) {
        PostsService.downvote(vm.post.id);
      }
    };

    vm.deletePost = function deletePost() {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        PostsService.deletePost(vm.post.id, vm.post.id);
      }
    };
  }
}());
