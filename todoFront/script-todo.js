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
            const markup = `<div><span>${todosItem.name}</span> <input type="checkbox" id='${todosItem._id}' onchange="updateItem('${todosItem._id}')"/></div>`;
            document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
            if (todosItem.status === true) {
                document.getElementById(todosItem._id).checked = true;
            }
        });
    })
    .catch(err => console.log(err));

const updateItem = (_id) => {

    const index = globalData.findIndex(x => x._id === _id);
    globalData[index].status = !globalData[index].status
    if (globalData[index].status === true) {
        document.getElementById(_id).checked = true;
    }
    return fetch('http://localhost:3000/todo', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(globalData[index])
    }).then(response => response.json())
        .then(response => console.log(response))
}
