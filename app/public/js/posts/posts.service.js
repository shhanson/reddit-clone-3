(function () {
  angular.module('reddit-clone')
    .service('PostsService', ['$http', function service($http) {
      const self = this;
      self.posts = [];

      self.getPosts = function getPosts() {
        return $http.get('/api/posts').then((response) => {
          self.posts = response.data;
        });
      };

      self.getPost = function getPost(postID) {
        return $http.get(`/api/posts/${postID}`);
      };

      self.addPost = function addPost(newPost) {
        $http.post('/api/posts', newPost).then((response) => {
          self.posts.push(response.data);
        });
      };

      self.updatePost = function updatePost(postID, editedPost) {
        $http.patch(`/api/posts/${postID}`, editedPost).then((response) => {
          for (let i = 0; i < self.posts.length; i++) {
            if (self.posts[i].id === postID) {
              self.posts[i] = response.data;
              return;
            }
          }
        });
      };

      self.upvote = function upvote(postID) {
        $http.post(`/api/posts/${postID}/votes`).then((response) => {
          for (let i = 0; i < self.posts.length; i++) {
            if (self.posts[i].id === postID) {
              self.posts[i].vote_count = response.data.vote_count;
              return;
            }
          }
        });
      };

      self.downvote = function downvote(postID) {
        $http.delete(`/api/posts/${postID}/votes`).then((response) => {
          for (let i = 0; i < self.posts.length; i++) {
            if (self.posts[i].id === postID) {
              self.posts[i].vote_count = response.data.vote_count;
              return;
            }
          }
        });
      };
    }]);
}());
