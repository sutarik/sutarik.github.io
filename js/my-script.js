var tags, triggers, variables;
var obj;

$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    obj = json;

    tags = json['tag'];
    triggers = json['trigger'];
    variables = json['variable'];
});