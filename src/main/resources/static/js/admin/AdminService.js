app.service('AdminService', ['$http', function ($http) {
	
    this.getUser = function getUser(username, password) {
        return $http({
            method: 'GET',
            url: 'admin/' + username + "/" + password
        });
    };
    
    this.getMessages = function getMessages(status) {
        return $http({
            method: 'GET',
            url: 'message/' + status
        });
    };
    
    this.getAllMessages = function getAllMessages() {
        return $http({
            method: 'GET',
            url: 'message'
        });
    };
    
    this.deleteMessage = function deleteMessage(id) {
        return $http({
            method: 'DELETE',
            url: 'message/' + id
        })
    };
    
    
    this.moveToMessage = function moveToMessage(takenNumber,status) {
        return $http({
            method: 'PUT',
            url: 'message/' + takenNumber + "/" + status,
            data: { takenNumber, status }
        })
    };
    
    this.changeUsername = function changeUsername(currentUsername, newUsername) {
        return $http({
            method: 'PUT',
            url: 'adminChangeUsername/' + currentUsername + "/" + newUsername,
            data: { currentUsername , newUsername}
        })
    };
    
    this.changePassword = function changePassword(currentPassword , newPassword) {
        return $http({
            method: 'PUT',
            url: 'adminChangePassword/' + currentPassword + "/" + newPassword,
            data: { currentPassword , newPassword}
        })
    };

      
}]);