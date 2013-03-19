'use strict';

$('.color-tab').click(function() {
	$('.color-slider').css('left',$('.color-slider').css('left') === '0px' ? -440 : 0);
});

$('.rain-transparent').click(function() {
	$('.color-slider').css('opacity',$('.color-slider').css('opacity') == 1 ? .4 : 1);
});

$('.change-pos').click(function() {
	var posTest = $('.color-slider').css('bottom') == 'auto';
	$('.color-slider').css('top',posTest ? 'auto' : 0);
	$('.color-slider').css('bottom',posTest ? 0 : 'auto');
	$('.change-pos').text(posTest ? 'Go up' : 'Go down');
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
				$(element).css(attrs['rainbowObject'] == 'true' ? 'background-color':attrs['rainbowObject'],'rgb('+$scope.r+','+$scope.g+','+$scope.b+')')
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
		template: '<div class="rain-control"><div class="rain-title">{{rainbowMaker}}<a class="go" href="#{{rainbowMaker}}"></a></div><div><div class="{{rainbowMaker}}-control rainbow-sliders"><p>H is {{h/255}}</p><input type="range" min=0 max=255 step=1 ng-model="h"/><p>S is {{s/255}}</p><input type="range" min=0 max=255 step=1 ng-model="s"/><p>L is {{l/255}}</p><input type="range" min=0 max=255 step=1 ng-model="l"/><p>RGB value is rgb({{r}},{{g}},{{b}})</p></div></div>',
		link: function ( $scope, element, attrs ) {
			$scope.h = 128;
			$scope.s = 128;
			$scope.l = 128;

			function hslToRgb(h, s, l){
				function hue2rgb(p, q, t){
						if(t < 0) t += 1;
						if(t > 1) t -= 1;
						if(t < 1/6) return p + (q - p) * 6 * t;
						if(t < 1/2) return q;
						if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
						return p;
				}
				var r, g, b;

				if(s == 0){
					r = g = b = l; // achromatic
				}else{
					

					var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
					var p = 2 * l - q;
					r = hue2rgb(p, q, h + 1/3);
					g = hue2rgb(p, q, h);
					b = hue2rgb(p, q, h - 1/3);
				}

				return [r * 255, g * 255, b * 255];
			};

			$scope.$watch('h+s+l',function() {
				var rgbArray = hslToRgb($scope.h/255,$scope.s/255,$scope.l/255);
				$scope.r = Math.floor(rgbArray[0]);
				$scope.g = Math.floor(rgbArray[1]);
				$scope.b = Math.floor(rgbArray[2]);
			});


			$('.rain-title',element).click(function(e) {
				if(!$(e.target).is('a')) {
					var height = $('.'+$scope.rainbowMaker+'-control').height();
					$('.rainbow-sliders:not(.'+$scope.rainbowMaker+'-control)').height(0);
					$('.'+$scope.rainbowMaker+'-control').height(0 != height ? 0 : 280);
				}
			});
		}
	};
});