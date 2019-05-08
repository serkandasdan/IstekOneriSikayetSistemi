app.service('IstekSikayetService', ['$http', function ($http) {
    this.addMessage = function addMessage(data) {
        return $http({
            method: 'POST',
            url: 'message',
            data: data
        });
    };
   
    this.addValidationCode = function addValidationCode(emailData) {
        return $http({
            method: 'POST',
            url: 'createCode',
            data: emailData
        });
    };
    
    this.getValidationCode = function getValidationCode(validationCode,email) {
        return $http({
            method: 'GET',
            url: 'getCreateCode/' + validationCode + "/" + email
        });
    };
    
    this.deleteCreateCode = function deleteCreateCode(email) {
        return $http({
            method: 'DELETE',
            url: 'deleteCode/' + email
        })
    };
    
}]);