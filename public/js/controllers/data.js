angular.module('app').controller('DataCtrl',['$scope','$window',function($scope,$window){
	$scope.data = {
			name : 'Débora Sopranzetti Lima',
			crp : '04/46922'
		};
	$scope.social = [
		{
			imgUrl : 'imgs/facebookIcon.png',
			link : 'https://www.facebook.com/terapiaclinicapsico'
		},
		{
			imgUrl : 'imgs/instagranIcon.png',
			link : 'https://www.instagram.com/terapiapsicologia'
		}
	];
}]);