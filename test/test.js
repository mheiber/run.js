var assert = require("assert")
var run=require('../run.js').run;
//MOCHA TESTS 
//npm install -g mocha
//then run "mocha test" in the parent directory

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      //expect([1,2,3].length).to.equal(3)
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

describe('run',function(){
	describe('run without binding',function(){
		var identity=function(x,callback){
			callback(null,x);
		};
		var simpleArray=run(identity,[1]);

		var add1=function(x,callback){
			callback(null,x+1);
		};
		var sum=run(add1,1);

		var multiply=function(x,y,callback){
			callback(null,x*y);
		};


		var productOfVals=run(multiply,2,3);
		var productOfValAndPromise=run(multiply,sum,3);

		describe('run with single, simple funcArg',function(){

			
			it('returns a thenable',function(){
				assert.equal('function',typeof sum.then);
			});

			it('eventually is result of node func(arg,callback)',function(done){
				sum.then(function(result){
					assert.equal(2,result);
					done()
				});
			});

		});

		describe('run with multiple funcArgs',function(){

			it('returns a thenable',function(){
				assert.equal('function',typeof sum.then);
			});
			it('eventually is result of node func(arg1,arg2,callback)',function(done){
				productOfVals.then(function(result){
					assert.equal(6,result);
					done()
				});
			});

		});
		describe('run with mix of promises and values',function(){
			it('should eventually be result of node-style func(arg1,arg2Promise,callback)',function(done){
				productOfVals.then(function(result){
					assert.equal(6,result);
					done()
				});
			});

		});
		describe('run(nodeStyleFunc,[x])',function(){

			it('should correctly handle a node-style func that accepts a single array value',function(done){
				simpleArray.then(function(result){
					assert.deepEqual([1],result);
					done()
				});
			});
		});
	});
	describe('run with binding',function(){

		var obj={
			identity:function(x,callback){
				callback(null,x);
			},
			add1:function(x,callback){
				callback(null,x+1);
			},
			multiply:function(x,y,callback){
				callback(null,x*y);
			}
		};

		var simpleArray=run(obj,obj.identity,[1]);
		var sum=run(obj,obj.add1,1)
		var productOfVals=run(obj,obj.multiply,2,3);
		var productOfValAndPromise=run(obj,obj.multiply,sum,3);

		describe('run with single, simple funcArg',function(){
			it('returns a thenable',function(){
				assert.equal('function',typeof sum.then);
			});

			it('eventually is result of node func(obj,obj.arg,callback)',function(done){
				sum.then(function(result){
					assert.equal(2,result);
					done()
				});
			});

		});

		describe('run with multiple funcArgs',function(){

			it('returns a thenable',function(){
				assert.equal('function',typeof sum.then);
			});
			it('eventually is result of node func(obj,obj.arg1,obj.arg2,callback)',function(done){
				productOfVals.then(function(result){
					assert.equal(6,result);
					done()
				});
			});

		});
		describe('run with mix of promises and values',function(){
			it('should eventually be result of node-style func(obj,obj.arg1,obj.arg2Promise,callback)',function(done){
				productOfVals.then(function(result){
					assert.equal(6,result);
					done()
				});
			});

		});
		describe('run(nodeStyleFunc,[x])',function(){

			it('should correctly handle a node-style func that accepts a single array value',function(done){
				simpleArray.then(function(result){
					assert.deepEqual([1],result);
					done()
				});
			});
		});



	});
});
