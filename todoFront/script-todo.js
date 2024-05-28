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
            document.getElementById(todosItem._id).checked = todosItem.status;
        });
    })
    .catch(err => console.log(err));

const updateStatus = (_id) => {
    const item = globalData.find(x => x._id === _id);
    item.status = !item.status
    document.getElementById(_id).checked = item.status;
    putData(_id)
}

const updateName = (_id) => {
    globalData.find(x => x._id === _id).name = document.getElementById(_id + 'name').value;
    putData(_id)
}

const putData = (_id) => {
    const item = globalData.find(x => x._id === _id);
    resolveRequest('PUT', item)
        .then(response => console.log(response))
}

const deleteItem = (_id) => {
    const index = globalData.findIndex(x => x._id === _id);
    globalData.splice(index, 1);
    document.getElementById(_id + 'div').remove();
    resolveRequest('DELETE',{_id: _id})
        .then(response => console.log(response))
}

const newItem = () => {
    const newItemName = document.getElementById("newToDoItem").value;
    console.log(newItemName)
    const newItem = {name: newItemName, status: false};
    resolveRequest('POST',newItem)
        .then(data => {
            globalData.push(data)
            console.log(globalData)
            const markup = `<div id='${data._id + 'div'}'><input type="text" id='${data._id + 'name'}' value='${data.name}' onblur="updateName('${data._id}')"/><input type="checkbox" id='${data._id}' onchange="updateStatus('${data._id}')"/><button onclick="deleteItem('${data._id}')">Delete</button></div>`;
            document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
        })

}

const resolveRequest = (method, body) => {
    return fetch('http://localhost:3000/todo', requestFactory(method, body))
        .then(response => response.json())
}

const requestFactory = (method, body) => {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }
}