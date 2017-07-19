(function () {
  angular.module('reddit-clone', ['ui.router', 'angularMoment'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state({
        name: 'posts',
        url: '/',
        component: 'posts',
      })
      .state({
        name: 'editPost',
        url: 'posts/:postId/edit',
        component: 'postform',
        // parent: 'posts',
        params: {
          editPostClicked: true,
          newPostClicked: false,
          post: null,
        },
      })
      .state({
        name: 'addPost',
        url: 'posts/add',
        component: 'postform',
        // parent: 'posts',
        params: {
          editPostClicked: false,
          newPostClicked: true,
        },
      });
  }
}());
