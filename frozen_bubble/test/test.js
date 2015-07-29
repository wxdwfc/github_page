window.onload = function(){
	test();
}

Array.prototype.clear = function(){
	console.log(this.length);
	for(var i = 0;i < this.length;++i)
		this.pop();

}


function test(){
	s = [1,2,3,4];
	console.log(s);
	s.clear();
	console.log(s);
}