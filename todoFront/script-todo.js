    fetch('http://localhost:3000/todo')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data=>{
            console.log(data);
            data.forEach(todosItem => {
                const markup = `<div><span>${todosItem.name}</span> <input type="checkbox" value='${todosItem.status}' onchange="updateItem('${todosItem._id}', '${todosItem.status}', '${todosItem.name}')"/></div>`;
                document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
            });
        })
        .catch(err => console.log(err));

const updateItem = (_id, status, name) => {
    // const formData = new FormData();
    // formData.append('_id', id);
    // formData.append('name', name);
    // formData.append('status', status);
    console.log({_id, status, name})
    return fetch('http://localhost:3000/todo', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({_id, status, name})
    }).then(response => response.json())
        .then(response => console.log(response))
}
