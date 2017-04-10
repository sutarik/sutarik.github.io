var obj;
var tags, triggers, variables;
var tagIds = [], variableIds = [], triggerIds = [], folderIds = [];
var groupIds = [];

// in this object is stored which tags are necessary for cerain checkbox
// the structure
// 'id-of-checkbox' : [array of tags indexes]
/*
var checkboxes = {
    "checkbox1" : [1,2,3],
    "checkbox2" : [3,4],
    "checkbox3" : [5,6]
};
*/

// define all checkboxes:
var checkboxes = {
     "youtube" : {
        "tags" : [1,2,3],
        "triggers" : [1,2,3],
        "variables" : [2,3,4,5],
        "folders" : [1]
     },
     "ecommerceClick" : {
        "tags" : [1,2,3],
        "triggers" : [1,2,3],
        "variables" : [2,3,4,5],
        "folders" : [2]
     }   
}

$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json);
    console.log(json.containerVersion.tag); // this will show the info it in firebug console
    obj = json;

    tags = json.containerVersion.tag;
    triggers = json.containerVersion.trigger;
    variables = json.containerVersion.variable;

    // store all tags, triggers and variables from container
    getTagId();
    getTriggerId();
    getVariableId();
});

$('#getGroups').click(function(e){
    var checked = $("input[type=checkbox]").prop('checked', true);
    for(var i=0;i<checked.length;i++){
        groupIds.push(checked[i].id);
    }

    console.log(groupIds);
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

function getTriggerId(){
    for(var i=0;i<triggers.length;i++){
        var obj = {};
        var name = triggers[i].name;
        var id = triggers[i].triggerId;
        obj[name] = id;
        triggerIds.push(obj);
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

function getFolderId(){

}

function generateJSON(){
    // TODO
    // go through all the checked checkboxes
    // store ids of those which are checked into variable: checked
    // in variable checkboxes, find those ids and store all the tags ids into one array
    // go through this array of tags ids and create array of triggers which are used
    // go through tags and triggers and indentify all variables used
    for(var i = 0; i < obj.containerVersion.tag.length; i++) {
        if(obj.containerVersion.tag[i].tagId == "4") {
            obj.containerVersion.tag.splice(i, 1);
        }
    }

    var newJSON = JSON.stringify(obj); // '{"name":"binchen"}'
    console.log(newJSON);
}