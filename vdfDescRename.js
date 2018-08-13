var VDF = require('vdf');
var fs = require('fs');

// Argument 1: Node
// Argument 2: Script Path
var args = process.argv.slice(2);

// Argument 3: VDF Path
// Argument 4+: Description
if(args.length < 2)
{
    Error("Invalid parameters specified.");
}

var obj = ParseFile();
obj = UpdateObj(obj);
WriteUpdatedFile(obj);

function ParseFile()
{
    var path = args[0];

    var rawData;
    try
    {
        rawData = fs.readFileSync(path, "utf8");
    }
    catch(e)
    {
        Error("Invalid path specified: " + e.message);
    }

    var vdfObj;
    try
    {
        var vdfObj = VDF.parse(rawData);
    }
    catch(e)
    {
        Error("Invalid VDF specified: " + e.message);
    }

    return vdfObj;
}

function UpdateObj(vdfObj)
{
    var desc = args.slice(1).join(" ");

    vdfObj.appbuild.desc = desc;

    return vdfObj;
}

function WriteUpdatedFile(vdfObj)
{
    var path = args[0];

    var vdfData = VDF.dump(vdfObj, true);

    try
    {
        fs.writeFileSync(path, vdfData);
    }
    catch(e)
    {
        Error("Cannot write to vdf. Please make sure the file is writable: " + e.message);
    }
}

function Error(message)
{
    console.error(message);
    console.log("Usage: vdfDescRename [vdfPath] [description]");
    process.exit(1);
}
