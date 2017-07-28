(function () {
  angular.module('reddit-clone')
    .component('posts', {
      controller: PostsController,
      templateUrl: './static/js/posts/posts.template.html',
    });

  PostsController.$inject = ['PostsService'];
  function PostsController(PostsService) {
    const vm = this;

    vm.posts = [];
    vm.$onInit = function onInit() {
      PostsService.getPosts().then(() => {
        vm.posts = PostsService.posts;
      });
      vm.sortSelected = '-vote_count';
    };

    // vm.loggedIn = function loggedIn() {
    //   return !!(UserService.session.id);
    // };
  }
}());
