angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope) {




})

.controller('ChatsCtrl',['$scope','$firebaseArray','$rootScope', function($scope,$firebaseArray,$rootScope) {
    
    var ref = new Firebase('https://scorching-fire-1308.firebaseio.com/');
    var sync = $firebaseArray(ref);  
    $scope.chats = sync;
    $scope.chat=[];

    $scope.SendChat = function (chat){
     if(window.localStorage.getItem("username") !== undefined ){

      $scope.chats.$add({
        user : $rootScope.authData.name,
        message : chat.message,
        imgUrl : $rootScope.authData.picture.data.url

      });

      chat.message = '';
      }
    }

}])

.controller('ChatDetailCtrl', function($scope, $stateParams, $rootScope) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$rootScope,$ionicPopup,ngFB) {
 

 /////////this is login twitter fire base not working on android 22 : dery 
/*$scope.login = function (){
  var ref = new Firebase('https://scorching-fire-1308.firebaseio.com/');
    ref.authWithOAuthPopup('twitter', function(error,authData){
      if(error){
        alert('There was an Error');
      } else {
        $ionicPopup.show({
    template: '<center>You are all set</center> ',
    title: 'Success',
    subTitle: 'Please use normal things',
    buttons: [
      { text: 'OK' ,type : 'button-positive'}
    ]
  })
        $scope.data = { user : users.name,
                            email : users.email,
        imgUrl : users.picture.data.url,
        description : "Facebook Sign in"}
      }
      $rootScope.authData = authData;
      console.log(authData);
          });

}*/

$scope.logout = function (){
  $rootScope.authData = undefined;
  $scope.data= undefined;
    window.localStorage.removeItem("username");
}

$scope.fbLogin = function () {
    ngFB.login({scope: 'email,public_profile,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                 ngFB.api({
        path: '/me',
        params: {fields: 'id,name,picture,gender,email'}
    }).then(
        function (users) {
           $scope.data = { user : users.name,
                            email : users.email,
        imgUrl : users.picture.data.url,
        description : "Facebook Sign in"}
       window.localStorage.setItem("username", users.username);

      
      $rootScope.authData = users;
            //$scope.user = user;
            console.log($rootScope.authData);
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });




                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};

});

