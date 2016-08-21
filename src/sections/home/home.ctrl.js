'use strict';
var home = angular.module('app.core');

home.filter("sanitize", ['$sce', function ($sce) {
    return function (text, htmlCode) {
        if (htmlCode == '' || htmlCode == null) {

            return text;
        }
        return $sce.trustAsHtml(htmlCode);
    }
}])
;

home.controller('HomeController', function ($scope, SearchService, $location, $localStorage) {
    // Provide some nice initial choices
    var initChoices = [
        "pad thai",
        "pizza",
        "chicken",
        "ice cream",
        "pig"
    ];
    var idx = Math.floor(Math.random() * initChoices.length);

    $scope.recipes = [];        // An array of recipe results to display
    $scope.page = 0;            // A counter to keep track of our current page
    $scope.allResults = false;  // Whether or not all results have been found.

    $scope.pageNum = 0;
    $scope.totals = 0;
    $scope.pageSize = 10;

    $scope.$storage = $localStorage;

    $scope.sources = [];

    $scope.sourceTerm = '';

    $scope.searchTerm = $location.search().q ;//|| initChoices[idx];

    $scope.search = function () {
        $scope.page = 0;
        $scope.recipes = [];
        $scope.allResults = false;

        $location.search({'q': $scope.searchTerm});
        $scope.loadMore();
    };

    // function checkLocalFilters() {
    //     if ($localStorage.filters == 0){
    //         $localStorage.filters = {};
    //     }
    // }
    // checkLocalFilters;

    var getSelectedFilters = function () {

        if (!Array.isArray($localStorage.filters)){
            $localStorage.filters = [];
        }
        var filters = $localStorage.filters;

        console.log(filters);

        if (filters.length > 0) {
            var ii = 0;
            var filtersString = [];
            for (; ii < filters.length; ii++) {
                filtersString.push(
                    {
                        "term": {
                            "source": filters[ii]
                        }
                    }
                )
            }

            var filterQuery = {
                "bool": {
                    "must": [
                        {
                            "or": {
                                "filters": filtersString
                            }
                        }
                    ]
                }
            }

            return filterQuery;
        }

    }

    $scope.loadMore = function () {
        SearchService.search($scope.searchTerm, $scope.page++, getSelectedFilters())
            .then(function (results) {
                
            var hits = results.hits;
            if (hits.length !== $scope.pageSize) {
                $scope.allResults = true;
            }
            $scope.pageNum = results.total / $scope.pageSize;
            $scope.totals = results.total;

            var ii = 0;
            for (; ii < hits.length; ii++) {
                $scope.recipes.push(hits[ii]);
            }

        });
    };

    //Get Filter List
    $scope.getFilterList = function (sourceTerm) {

        console.log("Start GetFilterList");
        SearchService.getSources(sourceTerm).then(function (result) {
            $scope.sources = result;
        },function GetFilterError(error) {
            console.log(error)
        }),

        console.log("End GetFilterList Method "+$scope.sources +" .");
    };

    // Load results on first run
    $scope.loadMore();
    $scope.getFilterList($scope.sourceTerm);

    $scope.toggleFilter = function (filter) {
        var filterID = $localStorage.filters.indexOf(filter);
        if (filterID >-1){
            $localStorage.filters.splice(filterID,1);// pop(filterID);
            console.log("uncheck "+filter+" !");
            $('#'+filter).checked = false;
        }else{
            $localStorage.filters.push(filter);
        }
        $scope.search();
    };


    // $('.source_search').on('keyup',function () {
    //     $scope.getFilterList($scope.sourceTerm);
    // })

    // $('.home-frame').jscroll({
    //     loadingHtml: '<img src="assets/images/loading.jpg" alt="Loading" /> Loading...',
    //     padding: 20,
    //     nextSelector: 'a.jscroll-next:last',
    //     contentSelector: 'li'
    // });
});
