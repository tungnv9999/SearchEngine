(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/filterbox/filterbox.tpl.html',
    '<div class="row">\n' +
    '    <div class="col-xs-12 filter-box">\n' +
    '        <label class="block_label">Tìm kiếm theo nguồn</label>\n' +
    '        <div class="tag_name">\n' +
    '            <span data-ng-repeat="filter in $storage.filters" class="single_tag label label-success">\n' +
    '                <span class="tag_text">{{filter}}</span>\n' +
    '                <span class="tag_close" ng-click="toggleFilter(filter)">x</span>\n' +
    '            </span>\n' +
    '        </div>\n' +
    '        <div class="full_row">\n' +
    '            <input type="text" ng-model="sourceTerm" placeholder="Tìm kiếm" class="source_search  col-xs-12" ng-keyup="getFilterList(sourceTerm)"/>\n' +
    '            <img src="../../assets/images/search.png" class="search_thumb">\n' +
    '        </div>\n' +
    '        <div class="filter-data checkbox">\n' +
    '            <!--<label data-ng-repeat="f in $storage.filters" class="block_label filter-item">-->\n' +
    '                <!--<input id="{{f.term}}" type="checkbox" class="filter-checkbox btn-danger"-->\n' +
    '                       <!--ng-click="toggleFilter(f.term)"-->\n' +
    '                       <!--value="{{f.term}}"-->\n' +
    '                       <!--ng-checked ="checked"-->\n' +
    '                <!--&gt;-->\n' +
    '                <!--{{f}}  <span>({{f.count}})</span>-->\n' +
    '            <!--</label>-->\n' +
    '\n' +
    '            <label data-ng-repeat="source in sources" ng-if="$storage.filters.indexOf(source.term) < 0" class="block_label filter-item">\n' +
    '                <input name="filters[]" id="{{source.term}}" type="checkbox" class="filter-checkbox btn-danger"\n' +
    '                ng-click="toggleFilter(source.term)"\n' +
    '                value="{{source.term}}"\n' +
    '                ng-checked ="$storage.filters.indexOf(source.term) > -1"\n' +
    '                >\n' +
    '                {{source.term}}  <span>({{source.count}})</span>\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <!--<div class="col-xs-12 filter-box">-->\n' +
    '        <!--<label class="block_label">Search by type</label>-->\n' +
    '        <!--<div class="tag_name">-->\n' +
    '        <!--</div>-->\n' +
    '        <!--<div class="full_row">-->\n' +
    '            <!--<input type="text" placeholder="search" class="topic_search col-xs-12"/>-->\n' +
    '            <!--<img src="../../assets/images/search.png" class="search_thumb">-->\n' +
    '        <!--</div>-->\n' +
    '    <!--</div>-->\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sections/home/home.tpl.html',
    '<div ng-controller="HomeController">\n' +
    '\n' +
    '    <div class="row searchbox">\n' +
    '        <div class="col-xs-1">\n' +
    '            <img class="searchbox-image" src="assets/images/angular.png">\n' +
    '        </div>\n' +
    '        <form ng-submit=\'search()\'>\n' +
    '            <div class="col-xs-10 searchbox-inputs">\n' +
    '                <div class="row full_row ">\n' +
    '                    <div class="col-xs-8">\n' +
    '                        <input ng-model=\'searchTerm\' class="form-control">\n' +
    '                    </div>\n' +
    '                    <div class="col-xs-3">\n' +
    '                        <input type="submit" class="btn btn-success form-control" ng-click="search()" value="Search">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="home-frame row">\n' +
    '        <div class="col-xs-4 col-md-3 col-lg-2 ">\n' +
    '            <filterbox></filterbox>\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="col-xs-8 col-md-9 col-lg-10">\n' +
    '            <div>\n' +
    '                <h3 class="search-results-info filter-box">Results: {{totals}}</h3>\n' +
    '            </div>\n' +
    '\n' +
    '            <table class="table table-striped table-responsive">\n' +
    '                <tr>\n' +
    '                    <th>STT</th>\n' +
    '                    <th class="recipe-name">Tên</th>\n' +
    '                    <th>Điểm</th>\n' +
    '                    <th>Nguồn</th>\n' +
    '                    <th>Nguyên liệu</th>\n' +
    '                    <th>Miêu tả</th>\n' +
    '                    <th>URL</th>\n' +
    '                </tr>\n' +
    '                <tr class="success" data-ng-repeat="recipe in recipes track by $index">\n' +
    '                    <td>#{{$index + 1}}</td>\n' +
    '\n' +
    '                    <td  ng-bind-html ="recipe._source.name| sanitize :recipe.highlight.name[0]" />\n' +
    '                    <td>{{recipe._score}}</td>\n' +
    '                    <!--<td ng-bind-html ="recipe._source.source| sanitize :recipe.highlight.source[0]" />-->\n' +
    '                    <td>{{recipe._source.source}}</td>\n' +
    '                    <td><span data-ng-repeat="ingredient in recipe._source.ingredients track by $index">\n' +
    '                        <span ng-if ="recipe.highlight.ingredients[0].indexOf(searchTerm) > -1" ng-bind-html ="recipe._source.name| sanitize :recipe.highlight.ingredients[0]"></span>\n' +
    '                        <span ng-if ="recipe.highlight.ingredients[0].indexOf(ingredient) <= -1">{{ingredient}}</span>\n' +
    '                        <span ng-if = "(recipe._source.ingredients.length > ($index+1))&&(ingredient!=\'\')">,</span>\n' +
    '                    </span></td>\n' +
    '                    <!--<td ng-bind-html ="recipe._source.ingredients| sanitize :recipe.highlight.ingredients[0]"/>-->\n' +
    '                    <td ng-bind-html ="recipe._source.description| sanitize :recipe.highlight.description[0]">{{recipe._source.description}}</td>\n' +
    '                    <td ng-bind-html ="recipe.highlight.url[0] | sanitize">{{recipe._source.url}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '\n' +
    '            <!--<nav aria-label="Page navigation">-->\n' +
    '                <!--<ul class="pagination">-->\n' +
    '                    <!--<li>-->\n' +
    '                        <!--<a href="#" aria-label="Previous">-->\n' +
    '                            <!--<span aria-hidden="true">&laquo;</span>-->\n' +
    '                        <!--</a>-->\n' +
    '                    <!--</li>-->\n' +
    '\n' +
    '                    <!--<li ng-repeat="pageNum track by $index"><a href="#">{{$index+1}}</a> </li>-->\n' +
    '\n' +
    '                    <!--<li>-->\n' +
    '                        <!--<a href="#" aria-label="Next">-->\n' +
    '                            <!--<span aria-hidden="true">&raquo;</span>-->\n' +
    '                        <!--</a>-->\n' +
    '                    <!--</li>-->\n' +
    '                <!--</ul>-->\n' +
    '            <!--</nav>-->\n' +
    '            <!--<pagination total-items="totals" ng-model="page" max-size="10" class="pagination-sm" boundary-links="true" rotate="false" num-pages="pageNum" items-per-page="10"></pagination>-->\n' +
    '\n' +
    '            <!--<ul uib-pagination ng-change="loadMore()" total-items="totals" ng-model="page" max-size="10" class="pagination-sm" boundary-links="true" rotate="false"></ul>-->\n' +
    '\n' +
    '            <!--<ul class="records">-->\n' +
    '                <!--<li data-ng-repeat="recipe in recipes track by $index" data-ng-class="{\'offline\': (recipe._source.url == \'#\')}">-->\n' +
    '                    <!--<div class="number">#{{$index + 1}} </div>-->\n' +
    '                    <!--<h3 ng-show="recipe.highlight.name == null"> {{recipe._source.name}}</h3>-->\n' +
    '                    <!--<h3 ng-show="recipe.highlight.name != null"> {{recipe.highlight.name[0]}}</h3>-->\n' +
    '                    <!--<p>{{recipe._source.description}}</p>-->\n' +
    '                    <!--<a href="{{recipe._source.url}}" data-ng-class="{\'disabled\': (recipe._source.url == \'#\')}"-->\n' +
    '                       <!--class="btn btn-lg btn-primary">{{recipe._score}}</a>-->\n' +
    '                    <!--<div class="clearfix"></div>-->\n' +
    '                <!--</li>-->\n' +
    '            <!--</ul>-->\n' +
    '            <!--<div class=\'load-more no-data tuts\' ng-cloak ng-hide=\'allResults\'>-->\n' +
    '                <!--<a ng-click=\'loadMore()\'>More...</a>-->\n' +
    '            <!--</div>-->\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();
