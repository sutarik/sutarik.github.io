var obj;
var tags, triggers, variables;

var tagId = [], variableId = [], triggerId = [], folderId = [];

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
        tagId.push(obj);
    }
}

function getVariableId(){

}

function getTriggerId(){

}

function getFolderId(){

}

function generateJSON(){
    // TODO
    // go through all the checked checkboxes
}