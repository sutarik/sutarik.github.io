$.getJSON("./data/boilerplate.json", function(json) {
    console.log(json); // this will show the info it in firebug console

    var tags = json['tag'];
    var triggers = json['trigger'];
    var variables = json['variable'];
});