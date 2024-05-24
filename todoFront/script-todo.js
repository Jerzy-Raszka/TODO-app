
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
                const markup = `<div><span>${todosItem.name}</span> <input type="checkbox" value="${todosItem.status}" onchange="updateItem('${todosItem._id}')"/></div>`;
                document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
            });
        })
        .catch(err => console.log(err));

const updateItem = (id) => {
    //TODO update by id here
}