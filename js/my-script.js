var obj;
var tags, triggers, variables, folders;
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
     "ga-pageView" : {
        "tags" : [3],
        "triggers" : [37],
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
    folders = json.containerVersion.folder;

    // store all tags, triggers and variables from container
    getTagId();
    getTriggerId();
    getVariableId();
    getFolderId();

    //generate checkboxes
    generateCheckboxes();
});

/*
function findVariables(obj){
    for (var k in obj){
        if (typeof obj[k] == "object" && obj[k] !== null)
            eachRecursive(obj[k]);
        else{
            if(k)
        } 
    }
}
*/

function getGroups(){
    groupIds = [];
    var checked = $("input:checked");
    
    for(var i=0; i<checked.length; i++){
        groupIds.push(checked[i].name);
    }

    console.log(groupIds);
}

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
    for(var i=0;i<folders.length;i++){
        var obj = {};
        var name = folders[i].name;
        var id = folders[i].folderId;
        obj[name] = id;
        folderIds.push(obj);
    }
}

function modifyObject(){
    var removeTags = ["1","4"];
    // erase tags
    for(var i = 0; i < obj.containerVersion.tag.length; i++) {
        console.log(obj.containerVersion.tag[i].tagId);
        if(removeTags.indexOf(obj.containerVersion.tag[i].tagId) >= 0) {
            obj.containerVersion.tag.splice(i,1);
            i--;
        }
    }

    //erase triggers
    var removeTriggers = ["6"];
    // erase triggers
    for(var i = 0; i < obj.containerVersion.trigger.length; i++) {
        console.log(obj.containerVersion.trigger[i].triggerId);
        if(removeTriggers.indexOf(obj.containerVersion.trigger[i].triggerId) >= 0) {
            obj.containerVersion.trigger.splice(i,1);
            i--;
        }
    }

    //erase variables
    var removeVariables = ["5","4","3"];
    // erase variables
    for(var i = 0; i < obj.containerVersion.variable.length; i++) {
        console.log(obj.containerVersion.variable[i].variableId);
        if(removeVariables.indexOf(obj.containerVersion.variable[i].variableId) >= 0) {
            obj.containerVersion.variable.splice(i,1);
            i--;
        }
    }


    var newJSON = JSON.stringify(obj); // '{"name":"binchen"}'
    console.log(newJSON);
}


function generateCheckboxes(){
    // TO DO
    // cez vsetky tagy, vytvorit checkbox
    // ked ho budem pridavat do body tak pozriet ci existuje taka grupa / based on folder
    var checkbox;
    var container = document.getElementById('checkboxes');
    var group;

    for(var i=0;i<tags.length;i++){
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = tags[i].name.replace(/ /g,'');
        checkbox.value = tags[i].tagId;
        checkbox.id = tags[i].name.replace(/ /g,'');

        var label = document.createElement('label');
        label.htmlFor = tags[i].name.replace(/ /g,'');
        label.appendChild(document.createTextNode(tags[i].name));

        var br = document.createElement('br');

        group = document.getElementById(tags[i].parentFolderId);
        if(group){
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(br);
        }else{
            var g = document.createElement('div');
            var l = document.createElement('label');

            l.appendChild(document.createTextNode(tags[i].parentFolderId));
            g.id = tags[i].parentFolderId;

            g.appendChild(l);
            g.appendChild(br);
            g.appendChild(checkbox);
            g.appendChild(label);
            g.appendChild(br);

            container.appendChild(g);
        }
    }

}