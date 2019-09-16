const simplegit = require("simple-git")(process.cwd());
const fs = require("fs");

/*console.log("Branch Test --- ");
simplegit.branch((err, branches) => {
	if (err) {
		throw err;
	}
	console.log(branches);
});*/
/*console.log("\n\nLocal Branch Test --- ");

simplegit.branchLocal((err, branches) => {
	if (err) {
		throw err;
	}
	console.log(branches);
});*/

//simplegit.clone()

//simplegit.cwd(//directory);

/*console.log("\n\nFetch Test --- ");
simplegit.fetch((err) => {
	if (err) {
		throw err;
	}
});*/

/*console.log("\n\nList Remotes Test --- ");
simplegit.listRemote([], (err, remotes) => {
	if (err) {
		throw err;
	}
	console.log(remotes);
});

console.log("\n\nDiff Summary Test --- ");
simplegit.diffSummary("", (err, summary) => {
	console.log(summary);
});
	

*/


/*console.log("\n\nCWD Test (Change Directory) --- ");
let cwd = "C:\\Users\admir\\Desktop\\testRepo";
fs.mkdirSync(cwd);
simplegit.cwd(cwd);
console.log(`Working Directory Successfully created, and switched: ${cwd}`);

console.log("\n\nInitialise Test --- ");
simplegit.init((err, result) => {
	if (err) {
		throw err;
	}
	console.log("Repo Initialised Successfully!");
	console.log(result);
});*/