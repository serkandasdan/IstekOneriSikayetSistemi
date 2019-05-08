var app = angular.module('app', [ 'ngRoute', 'ngCookies' ]);

app.config([ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(true);
			return $routeProvider.when('/', {
				templateUrl : 'isteksikayet.html',
				controller : 'IstekSikayetController'
			}).when('/isteksikayet', {
				templateUrl : 'isteksikayet.html',
				controller : 'IstekSikayetController'

			}).when('/admin', {
				templateUrl : 'admin.html',
				controller : 'AdminController'

			}).otherwise({
				redirectTo : '/'
			});
		} ])

.run([
		'$http',
		'$cookies',
		'$location',
		'$rootScope',
		function($http, $cookies, $location, $rootScope) {

			$rootScope.globals = $cookies.getObject('globals') || {};

			if ($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authorization'] = 'Basic '
						+ $rootScope.globals.currentUser.authdata;
			}

			$rootScope.$on('$locationChangeStart', function(event, next,
					current) {

				var loggedIn = $rootScope.globals.currentUser;

				if ($location.path() == '/admin'  && !loggedIn) {
					$location.path('/admin');

				} else if ($location.path() == '/admin' && loggedIn) {
					window.location = '/adminPanel.html';

				}else{
					
				}

			});

		} ]);