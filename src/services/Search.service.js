'use strict';

/*
 * Contains a service to communicate with the TRACK TV API
 */
angular
    .module('app.services', ['elasticsearch'])
    .service('SearchService', ['$q', 'esFactory', '$location',
            function ($q, elasticsearch, $location) {
                var client = elasticsearch({
                    host: $location.host() + ":9300"
                });

                var search = function (term, offset, filters) {
                    var deferred = $q.defer();
                    var query = {
                        "match": {
                            "_all": term
                        }
                    };



                    client.search({
                        "index": 'recipes',
                        "type": 'recipe',
                        "body": {
                            "size": 10,
                            "from": (offset || 0) * 10,
                            "query": query,
                            "filter": filters,
                            "highlight": {
                                "require_field_match": false,
                                "fields": {
                                    "*": {
                                        "pre_tags": [
                                            "<strong class='highlight'>"
                                        ],
                                        "post_tags": [
                                            "</strong>"
                                        ]

                                    }
                                }
                            }
                        }
                    })
                        .then(function (result) {
                        var ii = 0, hits_in, hits_out = [];
                        // hits_in = (result.hits || {}).hits || [];
                        // for (; ii < hits_in.length; ii++) {
                        //     hits_out.push(hits_in[ii]);//._source);
                        // }
                        // deferred.resolve(hits_out);

                        hits_in = (result.hits || {});
                        deferred.resolve(hits_in);
                    }, deferred.reject);

                    return deferred.promise;
                };

                var getSources = function (sourceTerm) {
                    var deferred = $q.defer();
                    var query = {
                        "facets": {
                            "tags": {
                                "facet_filter": {
                                    "prefix": {
                                        "source": sourceTerm
                                    }
                                },
                                "terms": {"field": "source"}},
                            "size": 60
                        },
                        "size": 0
                    };

                    client.search({
                        "index": 'recipes',
                        "type": 'recipe',
                        "body": query
                    }).then(function (result) {
                        deferred.resolve(result.facets.tags.terms);
                    }, function (error) {

                        deferred.reject("Error GetSources :"+error);
                    });

                    return deferred.promise;
                };

                return {
                    "search": search,
                    "getSources": getSources
                };


            }
        ]
    );