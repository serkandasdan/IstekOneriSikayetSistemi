app.controller('IstekSikayetController', [
		'$scope',
		'$interval',
		'IstekSikayetService',
		function($scope, $interval, IstekSikayetService) {

			var longMessage = 255;
			$scope.longMessage = longMessage;

			$scope.defaultSubject = function() {
				$scope.message = {
					'subject' : "İstek"
				};
			};

			$scope.sendValidationCode = function() {

				$scope.remainingTime = 300;
				var promise = $interval(function() {
					if ($scope.remainingTime === 0) {
						$interval.cancel(promise);
					} else {
						$scope.remainingTime--;
					}
				}, 1000);

				var emailData = {
					'email' : $scope.message.email
				};
				IstekSikayetService.addValidationCode(emailData).then(
						function success(response) {

						}, function error(response) {
							alert("Kod gönderilemedi");
						});

			};

			$scope.cancelSendMessage = function() {

				window.location = "/isteksikayet";
			};
			
			$scope.goToMainPage = function() {

				window.location = "/isteksikayet";
			};

			$scope.getValidationCode = function() {

				if ($scope.validationCode.length === 6 && $scope.remainingTime > 0 ) {
					IstekSikayetService.getValidationCode(
							$scope.validationCode, $scope.message.email).then(
							function success(response) {

								$scope.addMessage();
								$scope.deleteCreateCode();
							}, function error(response) {

								alert("Mesajınız gönderilemedi");

							});
				}
				else if($scope.remainingTime === 0){					
					alert("Süreniz doldu.");
				}
				
				else if ($scope.validationCode.length != 6) {
					alert("Doğrulama kodunu eksik girdiniz.");
				} else {
					alert("Doğru kodu giriniz.");
				}

			};

			$scope.deleteCreateCode = function() {

				IstekSikayetService.deleteCreateCode($scope.message.email)
						.then(function success(response) {

						}, function error(response) {

						});
			};

			$scope.addMessage = function() {

				var data = {
					'sender' : $scope.message.sender,
					'department' : $scope.message.department,
					'email' : $scope.message.email,
					'phoneNumber' : $scope.message.phoneNumber,
					'subject' : $scope.message.subject,
					'message' : $scope.message.message
				};

				IstekSikayetService.addMessage(data).then(
						function success(response) {

							window.location = "/successMessage.html";
						}, function error(response) {
							window.location = "/errorMessage.html";
						});
			}

		} ]);