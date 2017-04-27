var obj;
var tagIds = {}, variableIds = {}, bVariableIds = {}, triggerIds = {}, folderIds = {};
var variableNames = {}, bVariableNames = {};
var groupIds = [];

var keepVariables = [], keepBuiltInVariables = [], keepTags = [], keepTriggers = [], keepFolders = [];
var keepVariablesID = [], keepBuiltInVariablesID = [], keepTagsID = [], keepTriggersID = [], keepFoldersID = [];
var tags, triggers, variables, folders, bVariables;

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

    tags = json.containerVersion.tag;
   // var keepTags = json.containerVersion.tag;
    triggers = json.containerVersion.trigger;
    variables = json.containerVersion.variable;
    bVariables = json.containerVersion.builtInVariable;
    folders = json.containerVersion.folder;

    // store all tags, triggers and variables from container
   // getTagId();
   // getTriggerId();
    getVariableId();
   // getBuiltInVariableId();
    getFolderId();

    //generate checkboxes
    generateCheckboxes();
    // find variables in tags
    
    //findTags();
    //findTriggers(keepTags);
    //findVariables(keepTags,keepTriggers);
    //findFolders(keepTags,keepTriggers,keepVariables);
});

function findTags(groupIds){

    for(var i =0;i<tags.length;i++){
        for(var j=0;j<groupIds.length;j++){
            if(tags[i].tagId == groupIds[j]){
                keepTags.push(tags[i]);
                keepTagsID.push(tags[i].tagId);
            }
        }
    }
   // keepTags = tags.slice();
   findTriggers(keepTags);
}

function findTriggers(keepTags){
    for(var i=0;i<keepTags.length;i++){
        //cez firing a blocking triggers
        // popushovat do pola idcka
        if(keepTags[i].blockingTriggerId){
            var blockingTriggers = keepTags[i].blockingTriggerId;
            for(var j=0; j<blockingTriggers.length; j++){
             //   keepTriggers.indexOf(blockingTriggers[j]) === -1 ? keepTriggers.push(blockingTriggers[j]) : console.log('already exists');

                for(var k=0;k<triggers.length;k++){
                    if(triggers[k].triggerId == blockingTriggers[j]){
                        keepTriggers.indexOf(triggers[k]) === -1 ? keepTriggers.push(triggers[k]) : console.log('already exists');
                     //   keepTriggersID.indexOf(triggers[k].triggerId) === -1 ? keepTriggersID.push(triggers[k].triggerId) : console.log('already exists');
                        break;
                    }
                }

            }
        }

        if(keepTags[i].firingTriggerId){
            var firingTriggers = keepTags[i].firingTriggerId;
            for(var j=0; j<firingTriggers.length; j++){
               // keepTriggers.indexOf(firingTriggers[j]) === -1 ? keepTriggers.push(firingTriggers[j]) : console.log('already exists');

                for(var k=0;k<triggers.length;k++){
                    if(triggers[k].triggerId == firingTriggers[j]){
                        keepTriggers.indexOf(triggers[k]) === -1 ? keepTriggers.push(triggers[k]) : console.log('already exists');
                    //    keepTriggersID.indexOf(triggers[k].triggerId) === -1 ? keepTriggersID.push(triggers[k].triggerId) : console.log('already exists');
                        break;
                    }
                }

            }
        }
    }

    for(var i=0;i<keepTriggers.length;i++){
        keepTriggersID.push(keepTriggers[i].triggerId);
    }

    findVariables(keepTags, keepTriggers);
}

// same function for triggers
function findVariables(keepTags,keepTriggers){
   // TODO nepojdem cez vsetky tagy ale cez vsetky oznacene tagy
   var reg = /{{[^}]*}}/g;
   for(var i=0;i<keepTags.length;i++){
        var text = JSON.stringify(keepTags[i]);
        var result = text.match(reg);
        
        console.log("tag: " + keepTags[i].tagId);

        if(result){
            console.log("ano: " + keepTags[i].tagId);
            for(var j=0;j<result.length;j++){
                var temp = result[j].replace(/{/g,'').replace(/}/g,'');
                if(variableNames[temp] != undefined){
                   // keepBuiltInVariables.indexOf(temp) === -1 ? keepBuiltInVariables.push(temp) : console.log('already exists');
                   // keepVariables.indexOf(variableNames[temp]) === -1 ? keepVariables.push(variableNames[temp]) : console.log('already exists');
                   
                   for(var k=0;k<variables.length;k++){
                        if(variables[k].variableId == variableNames[temp]){
                            keepVariables.indexOf(variables[k]) === -1 ? keepVariables.push(variables[k]) : console.log('already exists');
                            //keepVariablesID.indexOf(variables[k].variableId) === -1 ? keepVariablesID.push(variables[k].variableId) : console.log('already exists');
                            break;
                        }
                    }
                }
            }
        }
    }

    for(var i=0;i<keepTriggers.length;i++){
        var text = JSON.stringify(keepTriggers[i]);
        var result = text.match(reg);
        
        if(result){
            for(var j=0;j<result.length;j++){
                var temp = result[j].replace(/{/g,'').replace(/}/g,'');
                if(variableNames[temp] != undefined){
                   // keepBuiltInVariables.indexOf(temp) === -1 ? keepBuiltInVariables.push(temp) : console.log('already exists');
                   // keepVariables.indexOf(variableNames[temp]) === -1 ? keepVariables.push(variableNames[temp]) : console.log('already exists');
                   
                   for(var k=0;k<variables.length;k++){
                        if(variables[k].variableId == variableNames[temp]){
                            keepVariables.indexOf(variables[k]) === -1 ? keepVariables.push(variables[k]) : console.log('already exists');
                            //keepVariablesID.indexOf(variables[k].variableId) === -1 ? keepVariablesID.push(variables[k].variableId) : console.log('already exists');
                            break;
                        }
                    }
                }
            }
        }
    }
    
    console.log("pred: " + keepVariables.length);

    for(var i=0;i<keepVariables.length;i++){
        // just if its custom javascript variable
        if(keepVariables[i].type == "jsm"){
            var text = JSON.stringify(variables[i]);
            var result = text.match(reg);
            
            if(result){
                for(var j=0;j<result.length;j++){
                    var temp = result[j].replace(/{/g,'').replace(/}/g,'');
                    if(variableNames[temp] != undefined){
                       // keepBuiltInVariables.indexOf(temp) === -1 ? keepBuiltInVariables.push(temp) : console.log('already exists');
                       // keepVariables.indexOf(variableNames[temp]) === -1 ? keepVariables.push(variableNames[temp]) : console.log('already exists');
    
                       for(var k=0;k<variables.length;k++){
                            if(variables[k].variableId == variableNames[temp]){
                                keepVariables.indexOf(variables[k]) === -1 ? keepVariables.push(variables[k]) : console.log('already exists');
                                //keepVariablesID.indexOf(variables[k].variableId) === -1 ? keepVariablesID.push(variables[k].variableId) : console.log('already exists');
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    for(var i=0;i<keepVariables.length;i++){
        keepVariablesID.push(keepVariables[i].variableId);
    }

    console.log("po: " + keepVariables.length);
    // TODO also search in variables - custom javascript type

    findFolders(keepTags, keepTriggers, keepVariables);
}

function findFolders(keepTags,keepTriggers,keepVariables){
   // TODO cez idcka
   // hladat parentFolderId a storenut to do keepFolders

   for(var i=0;i<keepTags.length;i++){
        for(var j=0;j<folders.length;j++){
            if(folders[j].folderId == keepTags[i].parentFolderId){
                keepFolders.indexOf(folders[j]) === -1 ? keepFolders.push(folders[j]) : console.log('folder already exists');
            }
        }
   }

   for(var i=0;i<keepTriggers.length;i++){
        for(var j=0;j<folders.length;j++){
            if(folders[j].folderId == keepTriggers[i].parentFolderId){
                keepFolders.indexOf(folders[j]) === -1 ? keepFolders.push(folders[j]) : console.log('folder already exists');
            }
        }   
    }

   for(var i=0;i<keepVariables.length;i++){
        for(var j=0;j<folders.length;j++){
            if(folders[j].folderId == keepVariables[i].parentFolderId){
                keepFolders.indexOf(folders[j]) === -1 ? keepFolders.push(folders[j]) : console.log('folder already exists');
            }
        }
   }

   for(var i=0;i<keepFolders.length;i++){
        keepFoldersID.push(keepFolders[i].folderId);
   }

   modifyObject();
}

function getGroups(){
    groupIds = [];
    var checked = $("input:checked");
    
    for(var i=0; i<checked.length; i++){
        groupIds.push(checked[i].value);
    }

    console.log(groupIds);

    findTags(groupIds);
}

function getTagId(){
    // iterate through array with tags and store their Id's
    for(var i=0;i<tags.length;i++){
        var name = tags[i].name;
        var id = tags[i].tagId;
        tagIds[id] = name;
    }
}

function getTriggerId(){
    for(var i=0;i<triggers.length;i++){
        var name = triggers[i].name;
        var id = triggers[i].triggerId;
        triggerIds[id] = name;
    }
}

function getVariableId(){
    for(var i=0;i<variables.length;i++){
        var name = variables[i].name;
        var id = variables[i].variableId;
        variableIds[id] = name;
        variableNames[name] = id;
    }
}

function getBuiltInVariableId(){
    for(var i=0;i<bVariables.length;i++){
        var name = bVariables[i].name;
        var id = bVariables[i].variableId;
        bVariableIds[id] = name;
        bVariableNames[name] = id;
    }
}

function getFolderId(){
    for(var i=0;i<folders.length;i++){
        var name = folders[i].name;
        var id = folders[i].folderId;
        folderIds[id] = name;
    }
}

function modifyObject(){
    
    var modified = JSON.parse(JSON.stringify(obj));;

    // erase tags
    for(var i = 0; i < modified.containerVersion.tag.length; i++) {
        console.log(modified.containerVersion.tag[i].tagId);
        var tId = modified.containerVersion.tag[i].tagId;

        if(keepTagsID.indexOf(tId) == -1){
            modified.containerVersion.tag.splice(i,1);
            i--;
        }
    }

    // erase triggers
    for(var i = 0; i < modified.containerVersion.trigger.length; i++) {
        console.log(modified.containerVersion.trigger[i].triggerId);
        var trId = modified.containerVersion.trigger[i].triggerId;

        if(keepTriggersID.indexOf(trId) == -1){
            modified.containerVersion.trigger.splice(i,1);
            i--;
        }
    }

    // erase variables
    for(var i = 0; i < modified.containerVersion.variable.length; i++) {
        console.log(modified.containerVersion.variable[i].variableId);
        var vId = modified.containerVersion.variable[i].variableId;

        if(keepVariablesID.indexOf(vId) == -1){
            modified.containerVersion.variable.splice(i,1);
            i--;
        }
    }

    // erase folders
    for(var i = 0; i < modified.containerVersion.folder.length; i++) {
        console.log(modified.containerVersion.folder[i].folderId);
        var fId = modified.containerVersion.folder[i].folderId;

        if(keepFoldersID.indexOf(fId) == -1){
            modified.containerVersion.folder.splice(i,1);
            i--;
        }
    }

    
    var newJSON = JSON.stringify(modified); // '{"name":"binchen"}'
    console.log(newJSON);
    $("#finalJSON").val(newJSON);

    //create new file
    var textFile = null;
    var data = new Blob([newJSON], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    var link = document.getElementById('downloadlink');
    link.href = textFile;
    link.style.display = 'block';
}


function generateCheckboxes(){
    // TO DO
    // cez vsetky tagy, vytvorit checkbox
    // ked ho budem pridavat do body tak pozriet ci existuje taka grupa / based on folder
    var container = document.getElementById('checkboxes');

    for(var i=0;i<tags.length;i++){
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "folder-" + tags[i].parentFolderId;
        checkbox.value = tags[i].tagId;
        checkbox.id = tags[i].name.replace(/ /g,'');
        checkbox.className = "tags";

        var label = document.createElement('label');
        label.className = "tag-label";
        label.htmlFor = tags[i].name.replace(/ /g,'');
        label.appendChild(document.createTextNode(tags[i].name));

        var br = document.createElement('br');
        var group = document.getElementById(tags[i].parentFolderId);
        
        if(group){           
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(br);
        }else{
            var c = document.createElement('input');
            c.type = "checkbox";
            c.name = "folder-" + tags[i].parentFolderId;

            c.onclick = function() {
                checkboxes = document.getElementsByName(c.name);
                for(var i=0, n=checkboxes.length;i<n;i++) {
                   checkboxes[i].checked = c.checked;
                }
            }

            var g = document.createElement('div');
            var l = document.createElement('label');
            var br2 = document.createElement('br');
            var emptyLine = document.createElement('br');

            l.className = "group-name";
            l.appendChild(document.createTextNode(folderIds[tags[i].parentFolderId]));
            g.id = tags[i].parentFolderId;
            g.className = "tag-group";

            g.appendChild(emptyLine);
            g.appendChild(c);
            g.appendChild(l);
            g.appendChild(br);
            g.appendChild(checkbox);
            g.appendChild(label);
            g.appendChild(br2);

            container.appendChild(g);
        }
    }

}

function selectAll(source) {
  checkboxes = document.getElementsByTagName('input');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}