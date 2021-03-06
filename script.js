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
        <div class="row">
                <div class="sNo">${index + 1}</div>
                <div class="title">
                    <div class="tit">${element[0]}</div>
                    <div class="stat statusTxt"  id="statTxt${index}">${element[2]}</div>
                </div>
                <div class="time">${element[1]}</div>
                <div class="statusTxt status" id="statusTxt${index}">${element[2]}</div>
                <div class="actions buttons1">
                    <div class = "btn2">
                        <button class="btnDel" id="deleted" onclick=deleted(${index})>Delete</button>
                    </div>
                    <div class = "btn2">
                        <button class="btnStatus" id="status${index}" onclick=alter(${index})>Mark Completed</button>
                    </div>
                </div>
        </div>
        `
    });
    todoTable.innerHTML = str;
    myFunction();
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
    if(confirm("Are you sure that you want to clear your TODO List?")) {
        localStorage.clear();
        update();
    }
}

function alter(alterIndex) {
    let statusBtn = document.getElementById(`status${alterIndex}`);
    let statusTxt = document.getElementById(`statusTxt${alterIndex}`);
    let statTxt = document.getElementById(`statTxt${alterIndex}`);
    itemStr = localStorage.getItem('itemsJson');
    item = JSON.parse(itemStr);
    if (item[alterIndex][2] == "Pending") {
        statusTxt.textContent = "Completed"
        statusTxt.style.color = 'green'
        statTxt.textContent = "Completed"
        statTxt.style.color = 'green'
        statusBtn.style.paddingLeft = '1.2rem'
        statusBtn.style.paddingRight = '1.2rem'
        statusBtn.textContent = "Mark Pending"
        statusBtn.style.backgroundColor = 'red'
        item[alterIndex][2] = "Completed"
    }
    else {
        statusTxt.textContent = "Pending"
        statusTxt.style.color = 'red'
        statTxt.textContent = "Pending"
        statTxt.style.color = 'red'
        statusBtn.textContent = "Mark Completed"
        statusBtn.style.paddingLeft = '0.6rem'
        statusBtn.style.paddingRight = '0.6rem'
        statusBtn.style.backgroundColor = 'green'
        item[alterIndex][2] = "Pending"
    }
    localStorage.setItem('itemsJson', JSON.stringify(item));
    myFunction();
}

function myFunction() {
    itemStr = localStorage.getItem('itemsJson');
    item = JSON.parse(itemStr);
    for (let i = 0; i<item.length ; i++) {
        let statusTxt = document.getElementById(`statusTxt${i}`);
        let statusBtn = document.getElementById(`status${i}`);
        let statTxt = document.getElementById(`statTxt${i}`);
        if (item[i][2] == "Completed") {
            statusTxt.style.color = 'green';
            statTxt.style.color = 'green';
            statusBtn.style.backgroundColor = 'red';
            statusBtn.textContent = "Mark Pending";
            statusBtn.style.paddingLeft = '1.2rem'
            statusBtn.style.paddingRight = '1.2rem'
        }
    }
}