const {
	process_
} = require('./worker.js');

const fetch = require('node-fetch');
var tress = require('tress');

var Q_process = tress(function (body, next) {
	run(body).then(() => next());
}, 1);

process.on('message', async (body) => {
	Q_process.push(body);
});


async function run({
	name,
    benchmark
}) {
	console.log('new compiler!');
	// const {
	// 	result,
	// 	score,
	// 	time
	// } = await process_(
	// 	sourceCode,
	// 	input,
	// 	output,
	// 	scorePerCase
	// );
	var log = 
	await process_(name,benchmark);

	try{
		console.log(`${log} complete`)
	}
	catch(e){
		console.log(e)
	}
	//TODO : -> json return {questionId,userId,result,score,time}
	// const body = {
	// 	questionId,
	// 	userId,
	// 	result,
	// 	score,
	// 	time,
	// };
	// console.log(body);
	// try {
	// 	// await fetch('http://10.148.0.2:5000/api/v1/grader_check/', {
	// 	await fetch('http://localhost:5000/aws/aws/getconfig', {
	// 		method: 'get',
	// 	}).then((res) => {
	// 		res.json()
	// 	});
	// }
	// catch (e) {
	// 	console.log(e)
	// }
}