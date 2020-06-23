var classes = [];

var searchField = $("#searchfield")

$.getJSON("BukkitAPI.json", function(data) {
    $("#loadingDiv").hide()
    classes = data
    $("#site").show()
})

searchField.on("input", function() {
    var term = searchField.val()
    var results = []
    for (var k in classes) {
        if (k.toLowerCase().includes(term.toLowerCase())) {
            results.push(k)
        }
    }
    var text = "<br>";

    for (var i = 0; i < results.length; i++) {
        var result = results[i]
        var methodText = "";
        var methods = classes[result].methods
        for (var k in methods) {
            var method = methods[k]
            var paramters = []
            for (var k2 in method) {
                if (k2 != "returns") {
                    paramters.push(k2)
                }
            }
            if (paramters.length == 0) {
                methodText += k + "(): " + getReturnTypeName(method.returns) + "<br>"
            } else {
                var paramterString = getReturnTypeName(method[paramters[0]]) + " " + paramters[0]
                for (var i2 = 1; i2 < paramters.length; i2++) {
                    var paramter = paramters[i2]
                    paramterString += ", " + getReturnTypeName(method[paramters[i2]]) + " " + paramters[i2]
                }
                methodText += k + "(" + paramterString + "): " + getReturnTypeName(method.returns) + "<br>"
            }


        }
        text += "<details><summary>" + result + "</summary>" + methodText + "</details>"
    }

    if (term.trim().toLowerCase() == "") {
        results = []
    }

    if (results.length == 0) {
        text = "<br> No records to show."
    }
    $("#classes").html(text)
})

function getReturnTypeName(clazz) {
    if (clazz == "void" || clazz == "boolean" || clazz == "int" || clazz == "double" || clazz == "float" || clazz == "char" || clazz == "byte" || clazz == "short") {
        return clazz;
    } else {
        return clazz.substr(clazz.lastIndexOf(".") + 1);
    }
}



$("a").click(function() {
    alert("You've clicked the link.");
});