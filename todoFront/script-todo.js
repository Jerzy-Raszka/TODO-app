let globalData = [];

fetch('http://localhost:3000/todo')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data => {
        globalData = data;
        console.log(data);
        globalData.forEach(todosItem => {
            const markup = `<div id='${todosItem._id + 'div'}'><input type="text" id='${todosItem._id + 'name'}' value='${todosItem.name}' onblur="updateName('${todosItem._id}')"/><input type="checkbox" id='${todosItem._id}' onchange="updateStatus('${todosItem._id}')"/><button onclick="deleteItem('${todosItem._id}')">Delete</button></div>`;
            document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
            if (todosItem.status === true) {
                document.getElementById(todosItem._id).checked = true;
            }
        });
    })
    .catch(err => console.log(err));

const updateStatus = (_id) => {
    const index = globalData.findIndex(x => x._id === _id);
    globalData[index].status = !globalData[index].status
    if (globalData[index].status === true) {
        document.getElementById(_id).checked = true;
    }
    putData(_id)
}

const updateName = (_id) => {
    const index = globalData.findIndex(x => x._id === _id);
    globalData[index].name = document.getElementById(_id + 'name').value;
    putData(_id)
}

const putData = (_id) => {
    const index = globalData.findIndex(x => x._id === _id);
    return fetch('http://localhost:3000/todo', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(globalData[index])
    }).then(response => response.json())
        .then(response => console.log(response))
}

const deleteItem = (_id) => {
    const index = globalData.findIndex(x => x._id === _id);
    globalData.splice(index, 1);
    document.getElementById(_id + 'div').remove();
    return fetch('http://localhost:3000/todo', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({_id: _id})
    }).then(response => response.json())
        .then(response => console.log(response))
}

const newItem = () => {
    console.log(document.getElementById("newToDoItem").value)
    const newItem = {name: document.getElementById("newToDoItem").value, status: false};
    return fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem)
    }).then(response => response.json())
        .then(data => {
            globalData.push(data)
            console.log(globalData)
            const markup = `<div id='${data._id + 'div'}'><input type="text" id='${data._id + 'name'}' value='${data.name}' onblur="updateName('${data._id}')"/><input type="checkbox" id='${data._id}' onchange="updateStatus('${data._id}')"/><button onclick="deleteItem('${data._id}')">Delete</button></div>`;
            document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
        })

}