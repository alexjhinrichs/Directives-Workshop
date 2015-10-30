var app = angular.module('directiveWorkshop');

app.directive('pending', function($q) {
	return {
		restrict: 'AE',
		scope: {
			request: '&'
		},
		link: function(scope, elem, attrs) {
			console.log(scope, elem, attrs);
			elem.on('click', function() {
				elem[0].textContent = "pending";
				elem[0].nextElementSibling.hidden = false;
				scope.request().then(function() {
					elem[0].nextElementSibling.hidden = true;
					elem[0].textContent = 'Submit';

				});
			});
		}
	};
});

app.directive('notify', function() {
	return {
		restrict: 'AE',
		scope: {
			request: '&',
			title: '=',
			body: '=',
			icon: '='
		},
		link: function(scope, elem, attr) {
			console.log(scope, elem, attr);

			var Notification = window.Notification || window.mozNotification || window.webkitNotification;
			Notification.requestPermission(function (permission) {
				//console.log(permission);
				console.log(Notification);
			elem.on ('click', function(title, body, icon) {
				var options = {
					body: scope.body,
					icon: scope.icon
				};
				var title = scope.title;
				var newOption = new Notification(title, options);
			});
		});
	}
}
});
