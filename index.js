let classes = [];
let searchField = $("#searchfield")
$.getJSON("BukkitAPI.json", function(data) {
    $("#loadingDiv").hide();
    classes = data;
    $("#site").show();
});
searchField.keydown(function(ev) {
    if (ev.which === 13) {
        let term = searchField.val();
        let results = [];
        for (let k in classes) {
            if (k.toLowerCase().includes(term.toLowerCase())) {
                results.push(k);
            }
        }
        let text = "<br>";
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let methodText = "";
            let methods = classes[result].methods;
            for (let k in methods) {
                let method = methods[k];
                let params = [];
                for (let k2 in method) {
                    if (k2 !== "returns") {
                        params.push(k2);
                    }
                }
                if (params.length === 0) {
                    methodText += `${k}(): ${getReturnTypeName(method.returns)}<br>";
                } else {
                    let paramterString = getReturnTypeName(method[params[0]]) + " " + params[0];
                    for (let i2 = 1; i2 < params.length; i2++) {
                        let paramter = params[i2];
                        paramterString += ", ${getReturnTypeName(method[params[i2]])} ${params[i2]}";
                    }
                    methodText += `${k}(${paramterString}): ${getReturnTypeName(method.returns)}<br>`;
                }
            }
            text += `<details><summary>${result}</summary>${methodText}</details>`;
        }
        if (!term.trim()) {
            results = [];
        }
        if (results.length === 0) {
            text = "<br> No records to show.";
        }
        $("#classes").html(text);
    }
});
const getReturnTypeName = ((clazz) => ["void", "boolean", "int", "double", "float", "char", "byte", "short"].includes(clazz) ? clazz : clazz.substr(clazz.lastIndexOf(".") + 1));
function simpleNameIncludes(clazz, includes) {
    let simplename = clazz.substr(clazz.lastIndexOf(".") + 1);
    return simplename.trim().toLowerCase() == includes.trim().toLowerCase();
}
$("a").click(function() {
    alert("You've clicked the link.");
});
