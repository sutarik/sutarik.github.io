var obj;
var tagIds = {}, variableIds = {}, bVariableIds = {}, triggerIds = {}, folderIds = {};
var variableNames = {}, bVariableNames = {};
var groupIds = [];

var keepVariables = [], keepBuiltInVariables = [], keepTags = [], keepTriggers = [], keepFolders = [];

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

$.getJSON("./data/boilerplate-new.json", function(json) {
    console.log(json);
    console.log(json.containerVersion.tag); // this will show the info it in firebug console
    obj = json;

    var tags = json.containerVersion.tag;
    var triggers = json.containerVersion.trigger;
    var variables = json.containerVersion.variable;
    var bVariables = json.containerVersion.builtInVariable;
    var folders = json.containerVersion.folder;

    // store all tags, triggers and variables from container
    getTagId(tags);
    getTriggerId(triggers);
    getVariableId(variables);
    getBuiltInVariableId(bVariables);
    getFolderId(folders);

    //generate checkboxes
    generateCheckboxes(tags,folders);
    // find variables in tags
    findVariables(tags);
});


function findVariables(tags){
   // TODO nepojdem cez vsetky tagy ale cez vsetky oznacene tagy
   var reg = /{{[^}]*}}/g;
   for(var i=0;i<tags.length;i++){
        var text = JSON.stringify(tags[i]);
        var result = text.match(reg);
        
        if(result){
            for(var j=0;j<result.length;j++){
                var temp = result[j].replace(/{/g,'').replace(/}/g,'');
                if(variableNames[temp] == undefined){
                      keepBuiltInVariables.indexOf(bVariableNames[temp]) === -1 ? keepVariables.push(temp) : continue;
                }else{
                    keepVariables.indexOf(variableNames[temp]) === -1 ? keepVariables.push(variableNames[temp]) : continue;
                }
            }
        }
    }
}


function getGroups(){
    groupIds = [];
    var checked = $("input:checked");
    
    for(var i=0; i<checked.length; i++){
        groupIds.push(checked[i].name);
    }

    console.log(groupIds);
}

function getTagId(tags){
    // iterate through array with tags and store their Id's
    for(var i=0;i<tags.length;i++){
        var name = tags[i].name;
        var id = tags[i].tagId;
        tagIds[id] = name;
    }
}

function getTriggerId(triggers){
    for(var i=0;i<triggers.length;i++){
        var name = triggers[i].name;
        var id = triggers[i].triggerId;
        triggerIds[id] = name;
    }
}

function getVariableId(variables){
    for(var i=0;i<variables.length;i++){
        var name = variables[i].name;
        var id = variables[i].variableId;
        variableIds[id] = name;
        variableNames[name] = id;
    }
}

function getBuiltInVariableId(bVariables){
    for(var i=0;i<bVariables.length;i++){
        var name = bVariables[i].name;
        var id = bVariables[i].variableId;
        bVariableIds[id] = name;
        bVariableNames[name] = id;
    }
}

function getFolderId(folders){
    for(var i=0;i<folders.length;i++){
        var name = folders[i].name;
        var id = folders[i].folderId;
        folderIds[id] = name;
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


function generateCheckboxes(tags, folders){
    // TO DO
    // cez vsetky tagy, vytvorit checkbox
    // ked ho budem pridavat do body tak pozriet ci existuje taka grupa / based on folder
    var container = document.getElementById('checkboxes');

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
        var group = document.getElementById(tags[i].parentFolderId);
        
        if(group){
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(br);
        }else{
            var g = document.createElement('div');
            var l = document.createElement('label');
            var br2 = document.createElement('br');
            var emptyLine = document.createElement('br');

            l.appendChild(document.createTextNode(folderIds[tags[i].parentFolderId]));
            g.id = tags[i].parentFolderId;

            g.appendChild(emptyLine);
            g.appendChild(l);
            g.appendChild(br);
            g.appendChild(checkbox);
            g.appendChild(label);
            g.appendChild(br2);

            container.appendChild(g);
        }
    }

}