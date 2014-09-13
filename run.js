//var Promise=require('es6-promise').Promise;
var q=require('q');

var run=function(func, funcArgs){
	// ([thisObj],func,funcArgs...) returns promise
	var args=Array.prototype.slice.call(arguments);
	//arrayify the funcArgs...
	var funcArgsArr=args.slice(1);

	var deferred=q.defer();
	q.all(funcArgsArr).then(function(funcArgsValues){
		funcArgsValues.push(deferred.makeNodeResolver());
		func.apply(null,funcArgsValues);
	});
	return deferred.promise;
};

exports.run=run;
