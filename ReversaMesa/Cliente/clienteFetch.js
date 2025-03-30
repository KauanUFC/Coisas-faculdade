// SELECT
async function fetchDataSelect() {
    try {
        const response = await fetch('http://localhost:3000/clienteRota/data'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const tableBody = document.getElementById('data-table');
        tableBody.innerHTML = ''; // Clear previous data
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.cliente_id}</td>
                <td>${row.nome}</td>
                <td>${row.telefone}</td>
                <td>${row.email}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}

// INSERT
const insertForm = document.getElementById('insert_Form'); 

insertForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('INS_nome')?.value.trim();
    const telefone = document.getElementById('INS_telefone')?.value.trim();
    const email = document.getElementById('INS_email')?.value.trim();

    if (!nome || !telefone || !email) {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/clienteRota/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, telefone, email }),
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
const updateForm = document.getElementById('updateForm'); 

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('UpD_id')?.value.trim();
    const nome = document.getElementById('UpD_nome')?.value.trim();
    const telefone = document.getElementById('UpD_telefone')?.value.trim();
    const email = document.getElementById('UpD_email')?.value.trim();

    if (!id || !nome || !telefone || !email) {
        alert('All fields (id, nome, telefone, email) are required');
        return;
    }

    const updateData = { id, nome, telefone, email };

    try {
        const response = await fetch('http://localhost:3000/clienteRota/update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'User updated successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update user: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the user.');
    }
});

// DELETE
const deleteForm = document.getElementById('deleteForm'); // Added event listener for delete form

deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('DEL_id')?.value.trim();

    if (!id) {
        alert('Field "id" is required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/clienteRota/delete-user/${id}`, {
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