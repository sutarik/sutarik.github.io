var tags, triggers, variables;

$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json); // this will show the info it in firebug console

    tags = json['tag'];
    triggers = json['trigger'];
    variables = json['variable'];
});