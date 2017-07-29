(function () {
  angular.module('reddit-clone', ['ui.router', 'angularMoment'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    // $routeProvider
    //     .when('/posts', {
    //       templateUrl: 'static/js/posts/posts.template.html',
    //       controller: 'PostsController',
    //       controllerAs: 'ctrl',
    //     });
    $stateProvider
      .state({
        name: 'posts',
        url: '/',
        component: 'posts',
      })
      .state({
        name: 'register',
        url: '/register',
        component: 'register',
      })
      .state({
        name: 'editPost',
        url: '/posts/:postId/edit',
        component: 'postform',
        // parent: 'posts',
        params: {
          editPostClicked: true,
          newPostClicked: false,
        },
      })
      .state({
        name: 'addPost',
        url: '/posts/add',
        component: 'postform',
        // parent: 'posts',
        params: {
          editPostClicked: false,
          newPostClicked: true,
        },
      });
  }
}());
