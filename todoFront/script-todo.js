
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
                const markup = `${todosItem.name} ${todosItem.status}`;
                document.getElementById('todoItems').insertAdjacentHTML('beforeend', markup);
            });
        })
        .catch(err => console.log(err));
