var doRowObject = [];
var categoryObject = [];
var rowUniqueCount;

window.onload = function() {
    rowUniqueCount = 0;
    categoryObject.push({name:"Work", color:"#f49542"});
    categoryObject.push({name:"School", color:"#5f147f"});
    categoryObject.push({name:"Chores", color:"#1dc5d1"});
    categoryObject.push({name:"Family", color:"#1d993e"});
}

function doSubmit() {
    var result = addDoRow();
    if(result !== "success") {
        alert(result);
    } else {
        toDoReDraw();
    }
}

function addDoRow() {
    var description = document.getElementById("descriptionInput");
    var date = document.getElementById("dateInput");
    var categoryDropDown = document.getElementById("categoryInput");
    var categoryText = document.getElementById("categoryTextInput");
    var categoryColor = document.getElementById("colorSelect");
    var status = document.getElementById("completedInput");

    if(description.value === "") {
        return "You must input a description for the do";
    } else if(date.value === ""){
        return "You must input a date for the do";
    } else if(categoryDropDown.value === "Pick a category" && categoryText.value === "") {
        return "You must input either an existing category, or your own custom category";
    } else if(categoryDropDown.value !== "Pick a category" && categoryText.value !== "") {
        return "You can either pick an existing category, or make your own, not both.";
    }
    if(categoryDropDown.value !== ""){
        var catColor = getColorForName(categoryDropDown.value);
        doRowObject.push({id:rowUniqueCount, description:description.value, date: date.value, category:categoryDropDown.value, color:catColor, status:status.checked});
    } else {
        categoryObject += {name:categoryText.value, color:categoryColor.value};
        doRowObject.push({id:rowUniqueCount, description:description.value, date: date.value, category:categoryText.value, color:categoryColor.value, status:status.checked});
    }
    rowUniqueCount++;
    return "success";
}

function getColorForName(catName) {
    for(var i=0; i<categoryObject.length; i++){
        if(categoryObject[i].name === catName) {
            return categoryObject[i].color;
        }
    }
}

function toDoReDraw() {
    var table = document.getElementById("toDoTable");
    var tableRowCount = table.rows.length;
    for(var i=2; i<tableRowCount; i++) {
        table.deleteRow(2);
    }

    var row;
    var newCell0;
    var newCell1;
    var newCell2;
    var newCell3;
    var newCell4;

    for(var i=0; i<doRowObject.length; i++) {
        row = table.insertRow(table.rows.length);
        newCell0 = row.insertCell(0);
        newCell1 = row.insertCell(1);
        newCell2 = row.insertCell(2);
        newCell3 = row.insertCell(3);
        newCell4 = row.insertCell(4);

        newCell0.innerHTML = "<td>" + doRowObject[i].description + "</td>";
        newCell1.innerHTML = "<td>" + doRowObject[i].date + "</td>";
        newCell2.innerHTML = "<td>" + doRowObject[i].category + "</td>";
        newCell3.innerHTML = "<td>" + "<input type=\"checkbox\" onclick=\"checkBoxClick(" + doRowObject[i].id + ")\">" + "</td>";
        newCell4.innerHTML = "<td>" + "<button type=\"button\" onclick=\"doDelete(" + doRowObject[i].id + ")\">Delete do</button>" + "</td>";
    }

}

function doDelete(id) {
    doRowObject = doRowObject.filter( function(val){ return val.id !== id; });
    toDoReDraw();
}

