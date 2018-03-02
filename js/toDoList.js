var doRowObject;
var categoryObject;
var rowUniqueCount;

window.onload = function() {
    var retrievedRowObject = JSON.parse(localStorage.getItem('rowObject'));
    var retrievedCategoryObject = JSON.parse(localStorage.getItem('categoryObject'));
    var retrievedItemCountObject = JSON.parse(localStorage.getItem('itemCount'));

    if(retrievedRowObject !== null){
        doRowObject = retrievedRowObject;
    } else {
        doRowObject = [];
    }
    if(retrievedCategoryObject !== null) {
        categoryObject = retrievedCategoryObject;
        populateCategorySelect()
    } else {
        categoryObject = [];

        categoryObject.push({name:"Work", color:"#f49542"});
        categoryObject.push({name:"School", color:"#5f147f"});
        categoryObject.push({name:"Chores", color:"#1dc5d1"});
        categoryObject.push({name:"Family", color:"#1d993e"});
    }
    if(retrievedItemCountObject !== null) {
        rowUniqueCount = retrievedItemCountObject;
        toDoReDraw();
    } else {
        rowUniqueCount = 0;
    }

    drawChart();
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

    var timeCreated = new Date();
    var dateString = ("0" + timeCreated.getDate()).slice(-2) + "-" + ("0"+(timeCreated.getMonth()+1)).slice(-2) + "-" +
        timeCreated.getFullYear() + " " + ("0" + timeCreated.getHours()).slice(-2) + ":" + ("0" + timeCreated.getMinutes()).slice(-2) +
        ":" + ("0" + timeCreated.getSeconds()).slice(-2);

    if(description.value === "") {
        return "You must input a description for the do";
    } else if(date.value === ""){
        return "You must input a date and time for the do";
    } else if(categoryDropDown.value === "Pick a category" && categoryText.value === "") {
        return "You must input either an existing category, or your own custom category";
    } else if(categoryDropDown.value !== "Pick a category" && categoryText.value !== "") {
        return "You can either pick an existing category, or make your own, not both.";
    }
    if(categoryDropDown.value !== "Pick a category"){
        var catColor = getColorForName(categoryDropDown.value);
        doRowObject.push({id:rowUniqueCount, description:description.value, date: date.value, category:categoryDropDown.value, color:catColor, status:status.checked, timeCreated:timeCreated, timeCreatedDecorated:dateString});
    } else {
        categoryObject.push({name:categoryText.value, color:categoryColor.value});
        doRowObject.push({id:rowUniqueCount, description:description.value, date: date.value, category:categoryText.value, color:categoryColor.value, status:status.checked, timeCreated:timeCreated, timeCreatedDecorated:dateString});
        populateCategorySelect();
    }
    rowUniqueCount++;
    localStorage.setItem('itemCount', rowUniqueCount);
    description.value = "";
    date.value = "";
    categoryDropDown.selectedIndex = 0;
    categoryText.value = "";
    categoryColor.value = "#000000";
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
    var newcell4;
    var newCell5;

    for(var i=0; i<doRowObject.length; i++) {
        row = table.insertRow(table.rows.length);
        row.id = "insertedRow" + doRowObject[i].id;

        newCell0 = row.insertCell(0);
        newCell1 = row.insertCell(1);
        newCell2 = row.insertCell(2);
        newCell3 = row.insertCell(3);
        newcell4 = row.insertCell(4);
        newCell5 = row.insertCell(5);

        newCell0.innerHTML = "<td>" + doRowObject[i].description + "</td>";
        newCell1.innerHTML = "<td>" + doRowObject[i].date.replace("T"," ") + "</td>";
        newCell2.innerHTML = "<td>" + doRowObject[i].category + "</td>";
        newCell3.innerHTML = "<td>" + "<input id=\"checkBox" + doRowObject[i].id + "\" type=\"checkbox\" onclick=\"checkBoxClick(" + doRowObject[i].id + ")\">" + "</td>";
        newcell4.innerHTML = "<td>" + doRowObject[i].timeCreatedDecorated + "</td>";
        newCell5.innerHTML = "<td>" + "<button type=\"button\" onclick=\"doDelete(" + doRowObject[i].id + ")\">Delete do</button>" + "</td>";
    }
    doCheckBoxAction();
    colorRows();
    localStorage.setItem('rowObject', JSON.stringify(doRowObject));
}

function doDelete(id) {
    var result = window.confirm("Are you sure you would like to delete a do?");
    if(result) {
        doRowObject = doRowObject.filter(function (val) {
            return val.id !== id;
        });
        toDoReDraw();
    }
}

function doCheckBoxAction() {
    for(var i=0; i<doRowObject.length; i++) {
        if(doRowObject[i].status) {
            document.getElementById("checkBox"+doRowObject[i].id).checked = true;
        }
    }
    localStorage.setItem('rowObject', JSON.stringify(doRowObject));
}

function checkBoxClick(id) {
    for(var i=0; i<doRowObject.length; i++) {
        if(doRowObject[i].id === id) {
            doRowObject[i].status = !doRowObject[i].status;
        }
    }
}

function colorRows() {
    for(var i=0; i<doRowObject.length; i++) {
        var row = document.getElementById("insertedRow"+doRowObject[i].id);
        row.style.backgroundColor = doRowObject[i].color;
    }
}

function populateCategorySelect() {
    var multiSelect = document.getElementById("categoryInput");
    // noinspection JSAnnotator
    multiSelect.options.length = 0;

    var firstOption = document.createElement("option");
    firstOption.text = "Pick a category";
    multiSelect.add(firstOption);
    for(var i=0; i<categoryObject.length; i++) {
        var option = document.createElement("option");
        option.text = categoryObject[i].name;
        multiSelect.add(option);
    }
    localStorage.setItem('categoryObject', JSON.stringify(categoryObject));
}

function sortCategory() {
    doRowObject.sort( function(a,b) {
        return a.category.localeCompare(b.category);
    });
    toDoReDraw();
}

function sortDate() {
    doRowObject.sort( function(a,b) {
        return new Date(a.timeCreated) - new Date(b.timeCreated);
    });
    toDoReDraw();
}

function sortStatus() {
    doRowObject.sort( function(a,b) {
        if((a.status && b.status)|| (!a.status && !b.status)) {
            return 0;
        } else if(a.status) {
            return 1;
        } else {
            return -1
        }
    });
    toDoReDraw();
}

function sortFinishDate() {
    doRowObject.sort( function(a,b) {
        return new Date(a.date) - new Date(b.date);
    });
    toDoReDraw();
}

function drawChart() {
    var canvas = document.getElementById("pieChart");
    var ctx = canvas.getContext("2d");
    var lastend = 0;
    var data = [];
    var myColor = [];
    var  count = {};
    doRowObject.forEach(function(i) { count[i.category] = (count[i.category]||0) + 1;});
    for (var property in count) {
        if (count.hasOwnProperty(property)) {
            data.push(count[property]);
            myColor.push(getColorForName(property));
        }
    }
    var myTotal = 0;

    for (var e = 0; e < data.length; e++) {
        myTotal += data[e];
    }

    for (var i = 0; i < data.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        lastend += Math.PI * 2 * (data[i] / myTotal);
    }
}