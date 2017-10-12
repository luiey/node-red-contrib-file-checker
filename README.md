# node-red-contrib-file-checker
A node for Node-RED to check if file exist

Install
-------

Run the following command in your Node-RED user directory - typically '~/.node-red'

    npm install node-red-contrib-file-checker

**Gotcha**
Usage
-----

Passing the filename with 'msg.filename' or in the 'File Path'.
Returns boolean 'false' or 'true' if no response received, or if the host is unresolveable.
The output will return status True and code 1 if the file exist. If it return status False and code 2, the file not exist. If it return status False and code 0, the path is invalid/not in escape character
