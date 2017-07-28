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
      // vm.doneProcessing = true;
    };

    // vm.loggedIn = function loggedIn() {
    //   return !!(UserService.session.id);
    // };


    vm.addComment = function addComment() {
      CommentsService.addComment(vm.postId, vm.comment).then((response) => {
        vm.comments.push(response.data);
        vm.comment = {};
      });
    };

    vm.deleteComment = function deleteComment(commentID) {
      const confirmDelete = confirm('Are you sure you want to delete this comment?');
      if (confirmDelete) {
        CommentsService.deleteComment(vm.postId, commentID);
        for (let i = 0; i < vm.comments.length; i++) {
          if (vm.comments[i].id === commentID) {
            vm.comments.splice(i, 1);
            vm.comment = {};
            return;
          }
        }
      }
    };
  }
}());
