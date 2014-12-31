"use strict";

angular.module('eucd', [])
.directive("edit",function($document){
	  return{
	    restrict: 'AE',
	    require: 'ngModel',
	    link: function(scope,element,attrs,ngModel){
	       element.bind("click",function(){
		       var ids = [];
		       ids.push("txt_name_" +ngModel.$modelValue.id);
		       ids.push("txt_maxcalltimes_" + ngModel.$modelValue.id)
		       scope.$apply(function(){
		    	   angular.copy(ngModel.$modelValue,scope.master);
		         //console.log(scope.master);
		       })
		       //console.log(id);
		       ids.forEach(function(id){
			       var obj = $("#"+id);
			       obj.removeClass("inactive");
			       obj.addClass("active");
			       obj.removeAttr("readOnly");

	       		});			      
		       scope.$apply(function(){
		    	   scope.showEdit = false;
			   });
	      });
	    }
	  }
})
.directive("update",function($document){
	  return{
	    restrict: 'AE',
	    require: 'ngModel',
	    link: function(scope,element,attrs,ngModel){
	      element.bind("click",function(){
	         alert(ngModel.$modelValue + " is updated, Update your value here.");
	         var ids = [];
		     ids.push("txt_name_" +ngModel.$modelValue.id);
		     ids.push("txt_maxcalltimes_" + ngModel.$modelValue.id);
		     ids.forEach(function(id){
		         var obj = $("#"+id);
		         obj.removeClass("active");
		         obj.addClass("inactive");
		         obj.attr("readOnly",true);
		     });
	          scope.$apply(function(){
	           scope.showEdit = true;
	         })
	      })
	    }
	  }
})
.directive("cancel",function($document){
	  return{
	    restrict: 'AE',
	    require: 'ngModel',
	    link: function(scope,element,attrs,ngModel){
	      element.bind("click",function(){
	         scope.$apply(function(){
	           angular.copy(scope.master,ngModel.$modelValue);
	           //console.log(ngModel.$modelValue);
	         })
	          
	         var id = "txt_name_" +ngModel.$modelValue.id;
	         var obj = $("#"+id);
	         obj.removeClass("active");
	         obj.addClass("inactive");
	         obj.prop("readOnly",true);
	          scope.$apply(function(){
	           scope.showEdit = true;
	         })
	      })
	    }
	  }
})
.directive("delete",function($document){
	  return{
	    restrict:'AE',
	    require: 'ngModel',
	    link:function(scope, element, attrs,ngModel){
	      element.bind("click",function(){
	        var id = ngModel.$modelValue.id;
	        alert("delete item where employee id:=" + id);
	        scope.$apply(function(){
	          for(var i=0; i<scope.employees.length; i++){
	            if(scope.employees[i].id==id){
	               console.log(scope.employees[i])
	               scope.employees.splice(i,1);
	            }
	          }
	          console.log(scope.employees);
	        })
	      })
	    }
	  }
});



