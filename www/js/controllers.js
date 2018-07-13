angular.module('starter.controllers', [])


.controller('SignInCtrl', function($scope, $state, $cordovaOauth,$localStorage,$ionicLoading) {

  $scope.signIn = function(user) {

$state.go('tab.dash');

  };
  $scope.facebookLogin = function() {
      $cordovaOauth.facebook("1716545048641787", ["user_posts","email", "user_website", "user_location", "user_relationships", "pages_show_list", "user_photos", "user_status"], {"auth_type": "rerequest"}).then(function(result) {
         $localStorage.accessToken = result.access_token;

            $state.go('tab.dash');
            $localStorage.$save();
      }, function(error) {
        alert("You are not authenticated")


      });
  }
})
.controller('DashCtrl', function($scope,$http,$state, $localStorage,$rootScope, $location,$ionicHistory,$ionicScrollDelegate, $rootScope) {


  $scope.init = function() {
       if($localStorage.hasOwnProperty("accessToken") === true) {
 $ionicHistory.nextViewOptions({disableBack: true});
           $http.get("https://graph.facebook.com/v2.10/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
               $scope.profileData = result.data;
           }, function(error) {
               alert("There was a problem getting your profile.  Check the logs for details.");

           });
       } else {
           alert("Not signed in");
       $state.go('signin');
       }
 };
 $rootScope.clear = function(success) {
   delete $localStorage.accessToken;
     console.log('clear');

            $location.path("/signin");
              alert("Logout Successfull");
        }, function (error) {
          alert("not Successfull");
       // error
     }

     var messageOptions = [
    {avatar_name:'Adam', content: 'Wow, this is really something huh?', style:{color:'#fff',background:'coral',float:'left'} },
    { avatar_name:'Max',content: 'Yea, it\'s pretty sweet', style:{color:'#fff',background:'coral',float:'right'}  },
    { avatar_name:'Adam',content: 'I think I like Ionic more than I like ice cream!', style:{color:'#fff',background:'coral',float:'left'}  },
    { avatar_name:'Max',content: 'Gee wiz, this is something special.', style:{color:'#fff',background:'coral',float:'right'}  },
    { avatar_name:'Adam', img: '../img/adam.jpg' , style:{color:'#fff',background:'coral',float:'left'} },
         { avatar_name:'Max', content: 'Is this magic?' , style:{color:'#fff',background:'coral',float:'right'} },
    { avatar_name:'Adam', content: 'Am I dreaming?', style:{color:'#fff',background:'coral',float:'left'}  },
     {avatar_name:'Max', img: '../img/max.png' , style:{color:'#fff',background:'coral',float:'right'} },
      { avatar_name:'Adam', content: 'Am I dreaming?', style:{color:'#fff',background:'coral',float:'left'}  },
      { avatar_name:'Max', content: 'Yea, it\'s pretty sweet', style:{color:'#fff',background:'coral',float:'right'}  },
      { avatar_name:'Adam', content: 'I think I like Ionic more than I like ice cream!', style:{color:'#fff',background:'coral',float:'left'}  }
  ];

  var messageIter = 0;
  $scope.messages = messageOptions.slice(0, messageOptions.length);

  $scope.add = function() {
    var nextMessage = messageOptions[messageIter++ % messageOptions.length];
    $scope.messages.push(angular.extend({}, nextMessage));

    // Update the scroll area and tell the frosted glass to redraw itself
    $ionicScrollDelegate.scrollBottom(true);
  };

})
.controller('ChatsCtrl', function($scope, Chats,Common_service) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var url = "https://randomuser.me/api/?results=10"
  Common_service.get_list(url).then(function(result){
    $scope.chats = result.results;
console.log($scope.chats);
  })

  // $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$ionicTabsDelegate) {

  $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
  }
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
