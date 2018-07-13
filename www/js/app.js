// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngCordovaOauth','ngStorage'])

.run(function($ionicPlatform, $rootScope, $ionicLoading,ConnectivityMonitor ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log(ionic.Platform.fullScreen);
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        if (ionic.Platform.isAndroid()) {
         StatusBar.backgroundColorByHexString('#A11BFF');
     } else {
         StatusBar.hide();
         window.plugin.statusbarOverlay.hide();
     }
      }
      alert("hi");
  ConnectivityMonitor.startWatching();
  alert("hi");
  $rootScope.$on('loading:show', function() {
      $ionicLoading.show({  template: '<ion-spinner icon="spiral"></ion-spinner>',
          duration: 2000})
    })

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })
    alert("hi");
  });
})
// .directive('hideTabs', function($rootScope, $ionicTabsDelegate) {
//   return {
//     restrict: 'A',
//     link: function($scope, $el) {
//       $scope.$on("$ionicView.beforeEnter", function () {
//         $ionicTabsDelegate.showBar(false);
//       });
//       $scope.$on("$ionicView.beforeLeave", function () {
//         $ionicTabsDelegate.showBar(true);
//       });
//     }
//   };
// })

.directive('hires', function() {
  return {
    restrict: 'A',
    scope: { hires: '@' },
    link: function(scope, element, attrs) {
      initialLoad = false

      element.bind('load', function() {
        initialLoad = true;
        if(!scope.hires) return;
        element.attr('src', scope.hires);
      });

      attrs.$observe('hires', function(value) {
        if(!value) return;
        if(initialLoad) element.attr('src', value);
      });
    }
  };
})
.config(function($stateProvider, $urlRouterProvider,  $httpProvider, $ionicConfigProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
   return {
     request: function(config) {
       $rootScope.$broadcast('loading:show')
       return config
     },
     response: function(response) {
       $rootScope.$broadcast('loading:hide')
       return response
     }
   }
 })
$ionicConfigProvider.tabs.position('bottom');
	  $ionicConfigProvider.scrolling.jsScrolling(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInCtrl',
    onEnter: function($state,$localStorage,$ionicHistory){
      if ($localStorage.hasOwnProperty("accessToken") === true) {
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('tabs.home');
    }
   }
  })
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("signin");
        });
});
