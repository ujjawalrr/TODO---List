function addAndUpdate() {
    let title = document.getElementById("title").value;
    let time = document.getElementById("time1").value + " - " + document.getElementById("time2").value;
    let status = "Pending";
    if (localStorage.getItem('itemsJson') == null) {
        item = [];
        item.push([title,time,status]);
        localStorage.setItem('itemsJson', JSON.stringify(item));
    }
    else {
        itemStr = localStorage.getItem('itemsJson');
        item = JSON.parse(itemStr);
        item.push([title,time,status]);
        localStorage.setItem('itemsJson', JSON.stringify(item));
    }
    update();
    myFunction();
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        item = [];
        localStorage.setItem('itemsJson', JSON.stringify(item));
    }
    else {
        itemStr = localStorage.getItem('itemsJson');
        item = JSON.parse(itemStr);
    }
    let todoTable = document.getElementById("todoTable");
    let str = "";
    item.forEach((element, index) => {
        str +=`
        <tr>
            <th>${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td class="statusTxt" id="statusTxt${index}">${element[2]}</td>
            <td>
                <button class="btnDel" id="deleted" onclick=deleted(${index})>Delete</button>
                <button class="btnStatus" id="status${index}" onclick=alter(${index})>Mark Completed</button>
            </td>
        </tr>
        `
    });
    
    todoTable.innerHTML = str;
}

let add = document.getElementById("add");
add.addEventListener("click", addAndUpdate);
update();

function deleted(itemIndex) {
    itemStr = localStorage.getItem('itemsJson');
    item = JSON.parse(itemStr);
    item.splice(itemIndex,1);
    localStorage.setItem('itemsJson', JSON.stringify(item));
    update();
    myFunction();
}
let clearList = document.getElementById("clearList");
clearList.addEventListener("click", clearListFn)
function clearListFn() {
    if(confirm("Are you sure that you are clearing your TODO List?")) {
        localStorage.clear();
        update();
    }
}

function alter(alterIndex) {

    let statusBtn = document.getElementById(`status${alterIndex}`);
    let statusTxt = document.getElementById(`statusTxt${alterIndex}`);
    itemStr = localStorage.getItem('itemsJson');
    item = JSON.parse(itemStr);
    if (item[alterIndex][2] == "Pending") {
        statusTxt.textContent = "Completed"
        statusTxt.style.color = 'green'
        statusBtn.textContent = "Mark Pending"
        statusBtn.style.backgroundColor = 'red'
        item[alterIndex][2] = "Completed"
    }
    else {
        statusTxt.textContent = "Pending"
        statusTxt.style.color = 'red'
        statusBtn.textContent = "Mark Completed"
        statusBtn.style.backgroundColor = 'green'
        item[alterIndex][2] = "Pending"
    }
    localStorage.setItem('itemsJson', JSON.stringify(item));
    
}

function myFunction() {
    itemStr = localStorage.getItem('itemsJson');
    item = JSON.parse(itemStr);
    for (let i = 0; i<item.length ; i++) {
        let statusTxt = document.getElementById(`statusTxt${i}`);
        let statusBtn = document.getElementById(`status${i}`);
        if (item[i][2] == "Completed") {
            statusTxt.style.color = 'green'
            statusBtn.style.backgroundColor = 'red'
            statusBtn.textContent = "Mark Pending"
            statusBtn.style.paddingLeft = "1.6rem";
            statusBtn.style.paddingRight= "1.6rem";
        }
    }
}