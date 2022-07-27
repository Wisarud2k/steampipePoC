var tress = require('tress');
const { exec } = require("child_process");

// create a queue object with worker and concurrency 2
var q = tress(function(job, done){
    console.log('running ' + job.name);
    // someAsyncFunction(job, function(err, data){
    //     if (err) {
    //         done(err, 'some message');
    //     } else {
    //         done(null, 'anything');
    //     }
    // });
    run(job).then(() => done());
}, 1);

async function run({
    name,
    benchmark
}) {
	console.log('new compiler!');
	// console.log(name)
    const command = `steampipe check ${benchmark} --export=${name}.json`

    const execRun = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd,{cwd:"steampipe-mod-aws-compliance/"} ,(error, stdout, stderr) => {
        if (error) {
            if (error.code === 68) {
            // leaks present
            resolve(stdout);
            } else {
            // gitleaks error
            reject(error);
            }
        } else {
            // no leaks
            resolve(stdout);
        }
        })
    })
    }

    (async () => {
    try {
    const response = await execRun(command)
    console.log(response)
    } catch (e) {
    console.log(e)
    }
    })()
	
}

// assign a callbacks
q.drain = function(){
    console.log('Finished');
};

q.error = function(err) {
    console.log('Job ' + this + ' failed with error ' + err);
};

q.success = function(data) {
    // console.log('Job ' + this + ' successfully finished. Result is ' + data);\
    console.log('queue sucess')
}

// add some items to the queue
q.push({name: 'cisv13',benchmark:'benchmark.cis_v130'});
q.push({name: 'cisv14',benchmark:'benchmark.cis_v140'});

// add some items to the queue (batch-wise)
// and specify callback only for that items (not for all queue)
// q.push([{name: 'Good'}, {name: 'Bad'}, {name: 'Ugly'}], function (err) {
//     console.log('finished processing item');
// });

// add some items to the front of the queue
// q.unshift({name: 'Cristobal Jose Junta'});
