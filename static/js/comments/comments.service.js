(function () {
  angular.module('reddit-clone')
    .service('CommentsService', ['$http', function service($http) {
      const self = this;
      self.comments = [];

      self.getComments = function getComments(postID) {
        return $http.get(`/api/posts/${postID}/comments`).then((response) => {
          self.comments = response.data;
        });
      };

      self.addComment = function addComment(postID, newComment) {
        return $http.post(`/api/posts/${postID}/comments`, newComment);
      };

      self.deleteComment = function deleteComment(postID, commentID) {
        $http.delete(`/api/posts/${postID}/comments/${commentID}`).then(() => {
          for (let i = 0; i < self.comments.length; i++) {
            if (self.comments[i].id === commentID) {
              self.comments.splice(i, 1);
              return;
            }
          }
        });
      };
    }]);
}());
