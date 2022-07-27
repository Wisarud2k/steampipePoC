const { exec } = require("child_process");
const { resolve } = require("path");
module.exports = {
    process_
}

async function process_(name,benchmark) {

    // exec('aws configure list', (error,stdout,stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(stdout)
    //     // return(stdout)
    //     // res.send(stdout)
    // })
    const command = `steampipe check ${benchmark} --export=${name}.json`
    // const command = `steampipe check ${benchmark} --output=json`
    console.log(name+benchmark)
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
    return new Promise(async function(resolve,reject){
        try{
            const response = await execRun(command)
            console.log(response)
            resolve(name)
        }catch(e){
            console.log(e)
        }
    })
    // (async () => {
    // try {
    // const response = await execRun(command)
    // console.log(response)
    // } catch (e) {
    // console.log(e)
    // }
    // })()

}

// // multiple line with input not working
// app.post('/aws/config', (req,res) => {
//     var access_key_id = req.body.access_key_id
//     var secret_access_key = req.body.secret_access_key
//     var region = req.body.region
//     var outputformat = '';
//     console.log(access_key_id+'............'+
//             secret_access_key+'.............'+region)
    
//     const aws = spawn('aws',["configure"])

//     // aws.stdin.write(`${access_key_id}\n`)
//     // aws.stdin.write(`${secret_access_key}\n`)
//     // aws.stdin.write(`${region}\n`)
//     // aws.stdin.write(`${outputformat}`)
//     aws.stdin.write("testinput\n")
//     aws.stdin.write("testinput2\n")
//     aws.stdin.write("testinput3\n")
//     aws.stdin.write("")

//     aws.stdin.end()

//     aws.stdout.on('data', output => {
//         res.send('configcomplete')
        
//     })

//     aws.stderr.on("data", data => {
//         console.log(`stderr: ${data}`);
//     });

//     aws.on('error', (error) => {
//         console.log(`error: ${error.message}`);
//     });

//     aws.on("close", code => {
//         // res.sendStatus(200);
//         console.log(`child process exited with code ${code}`);
//     });

// })

// // aws configure set aws_access_key_id $YOUR_ACCESS_KEY_ID; aws configure set aws_secret_access_key $YOUR_SECRET_ACCESS_KEY; aws configure set default.region $YOUR_AWS_DEFAULT_REGION
// // use cli oneline to set aws instead
// app.post('/aws/config_oneline',  (req,res) => {
//     var access_key_id = req.body.access_key_id
//     var secret_access_key = req.body.secret_access_key
//     var region = req.body.region
//     var outputformat = '';
//     console.log(access_key_id+'............'+
//             secret_access_key+'.............'+region)
    
//     //access key
//     exec(`aws configure set aws_access_key_id ${access_key_id}`, (error, stdout, stderr) => {

//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//     });
//     //secret key
//     exec(`aws configure set aws_secret_access_key ${secret_access_key}`, (error, stdout, stderr) => {

//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//     });
//     //region
//     exec(`aws configure set region ${region}`, (error, stdout, stderr) => {

//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         res.send("complete")
//         console.log(`stdout: ${stdout}`);
//     });

// })

// app.get('/aws/getconfig', (req,res) => {
//     exec('aws configure list', (error,stdout,stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         res.send(stdout)
//     })
// } )


// app.get('/aws/benchmark/nist800_rev4', async (req,res) => {
    

//     const command = `steampipe check benchmark.nist_800_53_rev_4 --output=json`

//     const execRun = (cmd) => {
//     return new Promise((resolve, reject) => {
//         exec(cmd,{cwd:"steampipe-mod-aws-compliance/"} ,(error, stdout, stderr) => {
//         if (error) {
//             if (error.code === 68) {
//             // leaks present
//             resolve(stdout);
//             } else {
//             // gitleaks error
//             reject(error);
//             }
//         } else {
//             // no leaks
//             resolve(stdout);
//         }
//         })
//     })
//     }

//     (async () => {
//     try {
//     const response = await execRun(command)
//     console.log(response)
//     res.send(response)
//     } catch (e) {
//     console.log(e)
//     }
//     })()
// })

// app.get('/aws/benchmark/cis_v13', (req,res) => {
    
//     const command = `steampipe check benchmark.cis_v130 --output=json`

//     const execRun = (cmd) => {
//     return new Promise((resolve, reject) => {
//         exec(cmd,{cwd:"steampipe-mod-aws-compliance/"} ,(error, stdout, stderr) => {
//         if (error) {
//             if (error.code === 68) {
//             // leaks present
//             resolve(stdout);
//             } else {
//             // gitleaks error
//             reject(error);
//             }
//         } else {
//             // no leaks
//             resolve(stdout);
//         }
//         })
//     })
//     }

//     (async () => {
//     try {
//     const response = await execRun(command)
//     console.log(response)
//     res.send(response)
//     } catch (e) {
//     console.log(e)
//     }
//     })()
// })

// app.get('/aws/benchmark/cis_v14',(req,res) => {


//     const command = `steampipe check benchmark.cis_v140 --output=json`

//     const execRun = (cmd) => {
//     return new Promise((resolve, reject) => {
//         exec(cmd,{cwd:"steampipe-mod-aws-compliance/"} ,(error, stdout, stderr) => {
//         if (error) {
//             if (error.code === 68) {
//             // leaks present
//             resolve(stdout);
//             } else {
//             // gitleaks error
//             reject(error);
//             }
//         } else {
//             // no leaks
//             resolve(stdout);
//         }
//         })
//     })
//     }

//     (async () => {
//     try {
//     const response = await execRun(command)
//     console.log(response)
//     res.send(response)
//     } catch (e) {
//     console.log(e)
//     }
//     })()
// })