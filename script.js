// 获取 DOM 元素
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const dateDisplay = document.getElementById('date-display');

// 显示今日日期
function displayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateDisplay.textContent = `今天是${year}年${month}月${day}日`;
    return `${year}-${month}-${day}`;
}

const todayDate = displayDate();

// 添加待办事项的函数
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    let dateList = document.getElementById(todayDate);
    if (!dateList) {
        const dateHeading = document.createElement('h2');
        dateHeading.textContent = todayDate;
        dateList = document.createElement('ul');
        dateList.id = todayDate;
        taskContainer.appendChild(dateHeading);
        taskContainer.appendChild(dateList);
    }

    // 创建新的列表项
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.classList.add('delete-button');
    const topButton = document.createElement('button');
    topButton.textContent = '置顶';
    topButton.classList.add('top-button');

    // 将元素添加到列表项中
    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    listItem.appendChild(topButton);

    // 将列表项添加到任务列表中
    dateList.appendChild(listItem);

    // 清空输入框
    newTaskInput.value = '';

    // 为复选框添加事件监听器
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            listItem.classList.add('completed');
            dateList.appendChild(listItem); // 移至底部
        } else {
            listItem.classList.remove('completed');
        }
    });

    // 为删除按钮添加事件监听器
    deleteButton.addEventListener('click', function () {
        listItem.remove();
    });

    // 为置顶按钮添加事件监听器
    topButton.addEventListener('click', function () {
        if (!checkbox.checked) {
            dateList.insertBefore(listItem, dateList.firstChild);
        }
    });
}

// 为添加按钮添加点击事件监听器
addTaskButton.addEventListener('click', addTask);

// 为输入框添加按键事件监听器，按下回车键时添加任务
newTaskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});