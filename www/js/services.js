angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('Common_service', function($http) {
    return {
       get_list: function(url) {
        return $http.get(url).then(function(data) {
            return data.data;
        });
    },
    post_list: function(url,obj) {
        return $http.post(url,obj).then(function(data) {
            return data.data;
        });
    },
  }
})
.factory('ConnectivityMonitor', function($rootScope,  $ionicPopup,  $timeout){

  return {
    isOnline: function(){
          if(ionic.Platform.isWebView()){
            return $cordovaNetwork.isOnline();
          } else {
            return navigator.onLine;
          }
        },
        isOffline: function(){
          if(ionic.Platform.isWebView()){
            return !$cordovaNetwork.isOnline();
          } else {
            return !navigator.onLine;
          }
        },
    startWatching: function(){
      if(ionic.Platform.isWebView()){
alert("hi");
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              var myPopup =  $ionicPopup.alert({
                       title: 'Network connected!',
                       template: '<center>Dont disconnect it!</center>',
                       buttons: [{ text: 'ok' ,
                     type: 'button-calm', }]
                     });
                     $timeout(function() {
                           myPopup.close(); //close the popup after 3 seconds for some reason
                        }, 3000);
            });
alert("hi");
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              var myPopup =  $ionicPopup.alert({
                       title: 'No Network Connectivity',
                       template: '<center  class="text-center">Please turn on the network</center>',
                       buttons: [{ text: 'ok' ,
                     type: 'button-assertive', }]
                     });
                     $timeout(function() {
                           myPopup.close(); //close the popup after 3 seconds for some reason
                        }, 3000);
              console.log("went offline");
            });
alert("hi");
          }
           else {
          window.addEventListener("online", function(e) {
           var myPopup =  $ionicPopup.alert({
                    title: 'Network connected!',
                    template: '<center>Dont disconnect it!</center>',
                    buttons: [{ text: 'ok' ,
                  type: 'button-calm', }]
                  });
                  $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                     }, 3000);
            console.log("went online");
          }, false);

          window.addEventListener("offline", function(e) {
           var myPopup =  $ionicPopup.alert({
                    title: 'No Network Connectivity',
                    template: '<center  class="text-center">Please turn on the network</center>',
                    buttons: [{ text: 'ok' ,
                  type: 'button-assertive', }]
                  });
                  $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                     }, 3000);
            console.log("went offline");
          }, false);
        }
  }
  }
})

;
