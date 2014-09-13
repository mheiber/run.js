//var Promise=require('es6-promise').Promise;
var q=require('q');

var _run= function(thisObject, func, funcArgs){
	var deferred=q.defer();
	q.all(funcArgs).then(function(funcArgsValues){
		funcArgsValues.push(deferred.makeNodeResolver());
		func.apply(thisObject,funcArgsValues);
	});
	return deferred.promise;
};

var run=function(){
	// ([thisObj],func,funcArgs...) returns promise
	var args=Array.prototype.slice.call(arguments);
	var newArgs;
	//if no obj provided, add null as object to bind to
	if(typeof args[0] !== 'object') {
		args.unshift(null);
	}
	//arrayify the funcArgs...
	var newArgs=args.slice(0,2);
	var tail=args.slice(2);
	newArgs.push(tail);

	log('running '+args[1]+' with args '+tail+'\n');
	return _run.apply(null,newArgs);
};

//set run.logging=false in order to view logs
log=function(str){
	if(run.logging){
		console.log(str);
	}
	return this;
};

exports.run=run;
