'use strict';

$('.color-tab').click(function() {
    $('.color-slider').css('left',$('.color-slider').css('left') === '0px' ? -440 : 0);
});

angular.module('ng')
	.directive('rainbowObject', function ($compile) {
	return {
		restrict: 'A',
		replace:false,
		scope:true,
		link: function ( $scope, element, attrs ) {
			$scope.r = 128;
			$scope.g = 128;
			$scope.b = 128;

			function upCss() {
				$(element).css('background-color','rgb('+$scope.r+','+$scope.g+','+$scope.b+')')
			}

			$scope.$watch('r',function() {
				upCss();
			},true);

			$scope.$watch('g',function() {
				upCss();
			},true);

			$scope.$watch('b',function() {
				upCss();
			},true);

			var newScope = $scope.$new();
			$scope.rainbowMaker = element.attr('id');

			$('.rainbow-container').append($compile("<div rainbow-maker='{{rainbowMaker}}' r='r' g='g' b='b'></div>")($scope));
		}
	};
	}).directive('rainbowMaker', function () {
	return {
		restrict: 'EA',
		scope: { r: '=', g:"=", b:"=",rainbowMaker:"@"},
		template: '<div class="control"><div class="rain-title">{{rainbowMaker}}</div><div><div class="{{rainbowMaker}}-control rainbow-sliders"><p>R</p><input type="range" min=0 max=255 step=1 ng-model="r"/><p>G</p><input type="range" min=0 max=255 step=1 ng-model="g"/><p>B</p><input type="range" min=0 max=255 step=1 ng-model="b"/></div></div>',
		link: function ( $scope, element, attrs ) {
			$scope.r = 128;
			$scope.g = 128;
			$scope.b = 128;
			$('.rain-title',element).click(function() {
				$('.rainbow-sliders:not(.'+$scope.rainbowMaker+'-control)').height(0);
				$('.'+$scope.rainbowMaker+'-control').height(250);
			});
		}
	};
});