module.exports = function(RED) {
    "use strict";
    var fs = require('fs')

    function FileCheckerNode(n) {
        RED.nodes.createNode(this,n);
        this.filename = n.filename;
        var node = this;

        this.on("input",function(msg) {
            var filename = node.filename || msg.filename || "";
			
			try
			{
				var exists = fs.existsSync(filename);
				// File exists - check the inode matches
				if (exists === true)
				{
					node.send({"payload":"File from path is existed.", "code":1, "status": exists.toString(), "filename":filename});
					this.status({fill:"green",shape:"dot",text:"File exist"});
				}
				else
				{
					node.send({"payload":"File from path is not existed", "code":2, "status": exists.toString(), "filename":filename});
					this.status({fill:"red",shape:"dot",text:"File not exist"});
				}
			} catch(err) {
				// File does not exist
				node.send({"payload":"Error - " + err.toString(), "code":0, "status": exists.toString(), "filename":filename});
				this.status({fill:"red",shape:"dot",text:"File not exist"});
			}
        });
        this.on('close', function() {
            node.status({});
        });
    }
    RED.nodes.registerType("filechecker",FileCheckerNode);
}
// NOTES:
// CODE FOR EVERY RESULT RETURN FROM FILE EXISTED AS PER BELOW
// 1: FILE EXIST
// 2: FILE NOT EXIST
// 3: FILE NOT EXIST AND EXCEPTION [THIS WILL OCCUR WHEN PATH INVALID/NOT IN ESCAPE CHARACTER]