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
        $http.post(`/api/posts/${postID}/comments`, newComment).then(() => {
          // self.comments.push(response.data);
        });
      };
    }]);
}());
