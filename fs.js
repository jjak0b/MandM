const levelJS = require('level-js');
const levelUP = require('levelup');
const levelFS = require('level-filesystem');

const db = levelUP( levelJS( require("./package.json").name ) );

const fs = levelFS(db);
if( typeof fs.Stats === "undefined"  ) {
	fs.Stats = require("level-filesystem/stat")({}).constructor;
}
if( typeof fs.ReadStream === "undefined" ) {
	fs.ReadStream = {}
}

module.exports = fs;