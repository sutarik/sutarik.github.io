var tags, triggers, variables;
var obj;

$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json.containerVersion.tag); // this will show the info it in firebug console
    obj = json;

    tags = json.containerVersion.tag;
    triggers = json.containerVersion.trigger;
    variables = json.containerVersion.variable;
});