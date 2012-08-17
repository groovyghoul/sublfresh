#!/usr/bin/env node

// npm install request
// npm install commander
// npm install cli-table

var request = require('request');
var program = require('commander');
var Table = require('cli-table');

program
  .version('0.0.1')
  .option('-u, --update [number]', 'Update repository [number]')
  .option('-f, --full [number]', 'Display more information for repository [number]')
  .parse(process.argv);

var table = new Table({
    head: ['#', 'Plugin Name', 'Last Updated']
  , colWidths: [5, 30, 27]
});

if (program.update) {
	//TODO -- figure out a way to update where your clone is
	console.log('Feature Not Implemented');
}
else if (program.full) {
	GetFullInfo(program.full);
}
else {
    GetFullInfo(-1);
}

function GetFullInfo(number) {
	request("https://api.github.com/orgs/SublimeText/repos", function (err, res, json) {
      json = JSON.parse(json);
    
      for (var i = 0; i < json.length; i++){
      	repoNumber = i + 1;
      	
      	if ((repoNumber == number) || (number == -1))
        	table.push(
    			[repoNumber, json[i]['name'], json[i]['pushed_at']]
			);
      }

      console.log(table.toString())
    });	
}