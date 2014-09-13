//var Promise=require('es6-promise').Promise;
var q=require('q');

var _run= function(func, funcArgs){
	var deferred=q.defer();
	q.all(funcArgs).then(function(funcArgsValues){
		funcArgsValues.push(deferred.makeNodeResolver());
		func.apply(null,funcArgsValues);
	});
	return deferred.promise;
};

var run=function(){
	// ([thisObj],func,funcArgs...) returns promise
	//real work is done by _run
	var args=Array.prototype.slice.call(arguments);
	//arrayify the funcArgs...
	var newArgs=[args[0]]
	var tail=args.slice(1);
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
