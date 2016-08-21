angular
    .module('app.core')
    .filter("sanitize",['$sce',function ($sce) {
        return function(text,htmlCode){
            if (htmlCode == '' || htmlCode == null)
            {
                return text;
            }
            return $sce.trustAsHtml(htmlCode);
        }
    }]);

