define(['./module'],function(directives){
    'use strict';	
    directives.directive("dropdownlabel",function($timeout){
		  return{
		    restrict:'E',
		    scope:{
		    	showColumns:'=showColumns',
		    	fullfillColumn:'@fullfillColumn',
		    	selectedItem:'=selectedItem',
		    	py:'=',
		    	query:'&'
		    },	    
		    template: '<input type="text" class="form-control dropdown-toggle" data-toggle="dropdown" required ng-model="py" />'
				+'<ul class="dropdown-menu" role="menu" style="margin-left:15px;">'
				+'<li ng-repeat="item in menuItmes">'
	 				+'<ul class="list-inline" ng-click="selectMenuItem($index)">'
	 				+'<li ng-repeat="col in showColumns">'
					+'<a href="javascript:void(0);" >{{item[col]}}</a>'
	 				+'</li>'
					+'</ul>' 
				+'</li>'		   
				+'</ul>',
		    link:function(scope, element, attrs){
		    	scope.selectMenuItem = function(selectedIndex){
		    		scope.selectedItem = scope.menuItmes[selectedIndex];
		    		scope.py = scope.selectedItem[attrs.fullfillColumn];
		    	};
		    }
		  }
	})
})





