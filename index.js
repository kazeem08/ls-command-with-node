#! /usr/bin/env node

/**
 * chmod +x index.js (excluding windows users)
 */

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const { lstat } = fs.promises;

// get target directory from command line or current working directory
const targetDir = process.argv[2] || process.cwd();

/**
 * read the directory to get the files/directory
 * map each item(promise) to lstat in array
 * Resolve the promises at once
 * Loop through each resolved item and check if it's a directory or file, then log
 */


fs.readdir(targetDir, async (err, filenames) => {
    if(err){
        throw new Error(err)
    }
    const allPromises = filenames.map(file => {
        return lstat(path.join(targetDir, file));
    });

        const allStatsResolved = await Promise.all(allPromises);
       
        for(let stats of allStatsResolved){
            const index = allStatsResolved.indexOf(stats);
             if(stats.isFile()){
                 console.log(chalk.blue(filenames[index], stats.isFile()));

             }else {
                console.log(chalk.bold(filenames[index]));
             }
        }

});
