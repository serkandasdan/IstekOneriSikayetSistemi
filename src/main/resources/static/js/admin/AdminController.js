app
		.controller(
				'AdminController',
				[
						'$scope',
						'$cookieStore',
						'$cookies',
						'$rootScope',
						'AdminService',
						'$location',
						'AuthenticationService',
						function($scope, $cookieStore, $cookies, $rootScope,
								AdminService, $location, AuthenticationService)

						{

							$scope.getAllMessages = function() {

								if (!$rootScope.globals.currentUser) {

									window.location = "/admin";

								}

								AdminService
										.getAllMessages()
										.then(
												function success(response) {

													$scope.tableTitle = "Tümü";
													$rootScope.includeUrl = "messages.html";

													$scope.newMessage = 0;
													$scope.readMessage = 0;
													$scope.examineMessage = 0;
													$scope.resultMessage = 0;
													$scope.allMessage = 0;

													for (i = 0; i < response.data.length; i++) {

														$scope.allMessage++;

														if (response.data[i].status == "1") {
															$scope.newMessage++;
														} else if (response.data[i].status == "2") {
															$scope.readMessage++;
														} else if (response.data[i].status == "3") {
															$scope.examineMessage++;
														} else if (response.data[i].status == "4") {
															$scope.resultMessage++;
														} else {

														}
													}

													$scope.file = response.data;
													$scope.current_grid = 1;
													$scope.filter_data = $scope.file.length;
													$scope.entire_user = $scope.file.length;

												}, function error(response) {

												});

							};

							$scope.messageDetails = function(responseData) {
								var data = {};
								data = responseData;
								$rootScope.id = data.id;
								$rootScope.takenNumber = data.takenNumber;
								$rootScope.subject = data.subject;
								$rootScope.sender = data.sender;
								$rootScope.department = data.department;
								$rootScope.email = data.email;
								$rootScope.phoneNumber = data.phoneNumber;
								$rootScope.createDate = data.createDate;
								$rootScope.message = data.message;

								if (data.status == "1") {
									$rootScope.newStatus = "Yeni Gelenler"
									$rootScope.statusTitle = $rootScope.newStatus;
								} else if (data.status == "2") {
									$rootScope.newStatus = "Okunanlar"
									$rootScope.statusTitle = $rootScope.newStatus;
								} else if (data.status == "3") {
									$rootScope.newStatus = "İncelenenler"
									$rootScope.statusTitle = $rootScope.newStatus;
								} else if (data.status == "4") {
									$rootScope.newStatus = "Sonuçlananlar"
									$rootScope.statusTitle = $rootScope.newStatus;
								} else {

								}

								$rootScope.includeUrl = "messageDetails.html";

							};

							$scope.defaultSize = function() {

								$scope.data_limit = "10";

							};

							$scope.getFirstUrl = function() {

								$scope.tableTitle = "Tümü";
								$rootScope.includeUrl = "messages.html";

							};

							$scope.getMessages = function(status) {

								AdminService
										.getMessages(status)
										.then(
												function success(response) {

													$rootScope.includeUrl = "messages.html";

													if (status == "1") {
														$scope.tableTitle = "Yeni Gelenler";
													} else if (status == "2") {
														$scope.tableTitle = "Okunanlar";
													} else if (status == "3") {
														$scope.tableTitle = "İncelenenler";
													} else if (status == "4") {
														$scope.tableTitle = "Sonuçlananlar";
													} else {

													}

													$scope.file = response.data;
													$scope.current_grid = 1;
													$scope.filter_data = $scope.file.length;
													$scope.entire_user = $scope.file.length;

												}, function error(response) {

												});

							};

							$scope.setFirstUrl = function(url) {

								$rootScope.includeUrl = url;

							};

							$scope.refreshPanel = function() {

								window.location = "/adminPanel.html";

							};

							$scope.page_position = function(page_number) {
								$scope.current_grid = page_number;
							};
							$scope.filter = function() {
								$timeout(
										function() {
											$scope.filter_data = $scope.searched.length;
										}, 20);
							};
							$scope.sort_with = function(base) {
								$scope.base = base;
								$scope.reverse = !$scope.reverse;
							};

							$scope.moveToMessage = function() {

								var moveStatus;

								if ($scope.newStatus == "Yeni Gelenler") {
									moveStatus = 1;
								} else if ($scope.newStatus == "Okunanlar") {
									moveStatus = 2;
								} else if ($scope.newStatus == "İncelenenler") {
									moveStatus = 3;
								} else if ($scope.newStatus == "Sonuçlananlar") {
									moveStatus = 4;
								} else {

								}

								AdminService
										.moveToMessage($rootScope.takenNumber,
												moveStatus)
										.then(
												function success(response) {

													$rootScope.includeUrl = "info.html";

												}, function error(response) {

												})
							};

							$scope.deleteMessage = function(id) {

								AdminService
										.deleteMessage(id)
										.then(
												function success(response) {

													$rootScope.includeUrl = "info.html";

												}, function error(response) {

												})
							};

							$scope.logout = function() {
								AuthenticationService.ClearCredentials();
								window.location = "/admin";
							};
							
							
							
							$scope.resetUsernameFields = function() {
								$scope.currentUsername= "";
								$scope.newUsername = "";
								$scope.currentUsernameInfo = "";
							};

							$scope.changeUsername = function() {

			

									AdminService
											.changeUsername(
													$scope.currentUsername,
													$scope.newUsername)
											.then(
													function success(response) {
														$scope.currentUsernameInfo = "";
														alert("Kullanıcı adınız başarılı bir şekilde değiştirildi.");
														$scope
																.resetUsernameFields();

													},
													function error(response) {

														if (response.status === 404) {
															$scope.currentUsernameInfo = "*Mevcut kullanıcı adı hatalı";

															$scope.currentUsername= "";
															$scope.newUsername = "";
					
														}

													});
								

							};				
							
							

							$scope.resetPasswordFields = function() {
								$scope.currentPassword = "";
								$scope.newPassword = "";
								$scope.controlPassword = "";
								$scope.dontMatchPasswordInfo = "";
								$scope.currentPasswordInfo = "";
							};

							$scope.changePassword = function() {

								if ($scope.newPassword != $scope.controlPassword) {

									$scope.dontMatchPasswordInfo = "Şifreler uyuşmuyor";
								}

								else {

									AdminService
											.changePassword(
													$scope.currentPassword,
													$scope.newPassword)
											.then(
													function success(response) {
														$scope.currentPasswordInfo = "";
														alert("Parolanız başarılı bir şekilde değiştirildi.");
														$scope
																.resetPasswordFields();

													},
													function error(response) {

														if (response.status === 404) {
															$scope.currentPasswordInfo = "*Mevcut parola hatalı";

															if ($scope.newPassword != $scope.controlPassword) {

																$scope.dontMatchPasswordInfo = "Şifreler uyuşmuyor";
															}
															$scope.currentPassword = "";
															$scope.newPassword = "";
															$scope.controlPassword = "";
														}

													});
								}

							};


							
							$scope.getUser = function() {
								AdminService
										.getUser($scope.user.username,
												$scope.user.password)
										.then(
												function success(response) {

													AuthenticationService
															.SetCredentials(
																	$scope.user.username,
																	$scope.user.password);

													window.location = "/adminPanel.html";

												},
												function error(response) {

													$scope.message = '*Kullanıcı adı veya şifre hatalı';

												});
							}

						} ]);

app.filter('beginning_data', function() {
	return function(input, begin) {
		if (input) {
			begin = +begin;
			return input.slice(begin);
		}
		return [];
	}
});
