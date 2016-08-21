angular
    .module('app.core')
    .directive('filterbox', searchbox);
function searchbox() {
    var directive = {
        controller: "HomeController",
        templateUrl: 'components/filterbox/filterbox.tpl.html',
        restrict: 'E',

    };
    return directive;

    function controller($scope) {
        // $scope.genres = [];
        // SearchService.get($scope.show.id).then(function(response){
        //     $scope.genres = response.genres;
        // });
    }
}