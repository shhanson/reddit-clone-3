(function () {
  angular.module('reddit-clone')
    .component('comments', {
      bindings: {
        postId: '<',
      },
      controller: CommentsController,
      templateUrl: '/js/comments/comments.template.html',
    });
  CommentsController.$inject = ['CommentsService'];
  function CommentsController(CommentsService) {
    const vm = this;
    vm.comment = {};
    vm.comments = [];

    vm.$onInit = function onInit() {
      CommentsService.getComments(vm.postId).then(() => {
        vm.comments = CommentsService.comments;
      });
    };


    vm.addComment = function addComment() {
      CommentsService.addComment(vm.postId, vm.comment);
      vm.comments.push(vm.comment);
      vm.comment = {};
    };
  }
}());
