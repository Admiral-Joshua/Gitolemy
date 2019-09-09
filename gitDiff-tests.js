const simpleGit = require('simple-git')(process.cwd());

simpleGit.diff((err, res) => {
	if (err) { throw err; };
	
	let diffs = res.split("diff --git");
		
	for (let diff of diffs) {
		
		let diffIndex = "";
		let changes = "";
		
		if (diff.length > 1) {
			let lines = diff.split("\n");
			
			let fileName = lines[0].split(" ")[1];
			console.log("Git Diff ---> " + fileName.replace("a/", ""));
			
			for (var i = 1; i < lines.length; i++)
			{
				let line = lines[i];
				if (line.indexOf("index") !== -1) {
					// If it an index line, we need to store this index and process later.
					diffIndex = line;
				} else if (line.indexOf("---") !== -1 || line.indexOf("+++") !== -1) {
					// Ignore these lines, not important for us.
				} else if (line.indexOf("\ No newline at end of file") !== -1) {
					// Also ignore these...
				} else if (line.startsWith("@@")) {
					// And finally, ignore these...
				} else {
					changes += "\n" + line;
				}
			}
			console.log(changes);
			
		}
	}
});