var obj;
var tags, triggers, variables;

var tagIds = [], variableIds = [], triggerIds = [], folderIds = [];

$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json.containerVersion.tag); // this will show the info it in firebug console
    obj = json;

    tags = json.containerVersion.tag;
    triggers = json.containerVersion.trigger;
    variables = json.containerVersion.variable;

    getTagId();
});

function getTagId(){
    // iterate through array with tags and store their Id's
    for(var i=0;i<tags.length;i++){
        var obj = {};
        var name = tags[i].name;
        var id = tags[i].tagId;
        obj[name] = id;
        tagIds.push(obj);
    }
}

function getVariableId(){
    for(var i=0;i<variables.length;i++){
        var obj = {};
        var name = variables[i].name;
        var id = variables[i].variableId;
        obj[name] = id;
        variableIds.push(obj);
    }

}

function getTriggerId(){
    for(var i=0;i<triggers.length;i++){
        var obj = {};
        var name = triggers[i].name;
        var id = triggers[i].triggerId;
        obj[name] = id;
        triggerIds.push(obj);
    }

}

function getFolderId(){

}

function generateJSON(){
    // TODO
    // go through all the checked checkboxes
    // check their arrays of tags ids
    // store those ids to array
    // go through these tags and create array of triggers which are usedd
    // go through tags and triggers and indentify valu
}