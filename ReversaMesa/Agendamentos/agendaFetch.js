// SELECT
async function fetchDataSelect_Agendamentos() {
    try {
        const response = await fetch('http://localhost:3000/agendaRota/data-agenda'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const tableBody = document.getElementById('data-agenda');
        tableBody.innerHTML = ''; // Clear previous data
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.agendamento_id}</td>
                <td>${row.reserva_id}</td>
                <td>${row.status}</td>
                <td>${row.observacoes}</td>
                
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}



// INSERT
const insertForm_agenda = document.getElementById('insert_Form_Agenda'); 

insertForm_agenda.addEventListener('submit', async (e) => {
    e.preventDefault();

        const reserva_id = document.getElementById('INS_reserva_agenda')?.value.trim();
        const status = document.getElementById('INS_Status')?.value.trim();
        const observacoes = document.getElementById('INS_Observacoes')?.value.trim();

        if (!reserva_id || !status || !observacoes) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/agendaRota/add-agenda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reserva_id, status, observacoes }),
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
const updateForm_agenda = document.getElementById('updateForm_agenda'); 

updateForm_agenda.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('UpD_id_agenda')?.value.trim();
    const status = document.getElementById('UpD_status_agenda')?.value.trim();
    const observacoes = document.getElementById('UpD_observacoes_agenda')?.value.trim();
    

    if (!id || !status || !observacoes) {
        alert('All fields (id, nome, telefone, email) are required');
        return;
    }

    const updateData = { id, status, observacoes };

    try {
        const response = await fetch('http://localhost:3000/agendaRota/update-agenda', {
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
const deleteForm_agenda = document.getElementById('deleteForm_agenda'); // Added event listener for delete form

deleteForm_agenda.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('DEL_id_agenda')?.value.trim();

    if (!id) {
        alert('Field "id" is required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/agendaRota/delete-agenda/${id}`, {
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

