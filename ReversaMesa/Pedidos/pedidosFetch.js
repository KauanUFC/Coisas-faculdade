// SELECT
async function fetchDataSelect_Pedidos() {
    try {
        const response = await fetch('http://localhost:3000/pedidosRota/data-pedidos'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const tableBody = document.getElementById('data-pedidos');
        tableBody.innerHTML = ''; // Clear previous data
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.pedido_id}</td>
                <td>${row.agendamento_id}</td>
                <td>${row.descricao}</td>
                <td>${row.quantidade}</td>
                <td>${row.horario_pedido}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}

// INSERT
const insertForm_pedidos = document.getElementById('insert_Form_pedido'); 

insertForm_pedidos.addEventListener('submit', async (e) => {
    e.preventDefault();

    const agendamento_pedido_id = document.getElementById('INS_agendamento_pedido')?.value.trim();
    const descricao = document.getElementById('INS_descricao_pedido')?.value.trim();
    const quantidade = document.getElementById('INS_quantidade_pedido')?.value.trim();
    const horario_pedido = document.getElementById('INS_horario_pedido')?.value.trim();

    if (!agendamento_pedido_id || !descricao || !quantidade || !horario_pedido) {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/pedidosRota/add-pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agendamento_pedido_id, descricao, quantidade, horario_pedido }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'User added successfully!');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to add user');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the user. Please try again.');
    }
});

// UPDATE
// UPDATE
const updateForm_pedido = document.getElementById('updateForm_pedido'); 

updateForm_pedido.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('UpD_id_pedido')?.value.trim();
    const descricao = document.getElementById('UpD_descricao_pedido')?.value.trim();
    const quantidade = document.getElementById('UpD_quantidade_pedido')?.value.trim();
    const horario_pedido = document.getElementById('UpD_horario_pedido')?.value.trim();

    if (!id || !descricao || !quantidade || !horario_pedido) {
        alert('All fields (id, descricao, quantidade, horario_pedido) are required');
        return;
    }

    const updateData = { id, descricao, quantidade, horario_pedido };

    try {
        const response = await fetch('http://localhost:3000/pedidosRota/update-pedido', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Pedido updated successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update pedido: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the pedido.');
    }
});


// DELETE
const deleteForm_pedido = document.getElementById('deleteForm_pedido'); // Added event listener for delete form

deleteForm_pedido.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('DEL_id_pedido')?.value.trim();

    if (!id) {
        alert('Field "id" is required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/pedidosRota/delete-pedido/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'User deleted successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to delete user: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
    }
});

