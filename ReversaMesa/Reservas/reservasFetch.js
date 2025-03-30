// SELECT
async function fetchDataSelect_Reservas() {
    try {
        const response = await fetch('http://localhost:3000/reservasRota/data-reserva'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        const tableBody = document.getElementById('data-reserva');
        tableBody.innerHTML = ''; 
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.reserva_id}</td>
                <td>${row.cliente_id}</td>
                <td>${row.mesa_id}</td>
                <td>${row.data_hora}</td>
                <td>${row.numero_pessoas}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}


// INSERT

const insert_Form_Reservas = document.getElementById('insert_Form_Reservas'); 

insert_Form_Reservas.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data_hora = document.getElementById('INS_Data_hora')?.value.trim();
    const numero_pessoas = document.getElementById('INS_numero_pessoas')?.value.trim();
    const cliente_id = document.getElementById('INS_cliente_id')?.value.trim();
    const mesa_id = document.getElementById('INS_mesa_id')?.value.trim();

    console.log('data_hora:', data_hora);
    console.log('numero_pessoas:', numero_pessoas);
    
    if (!data_hora || !numero_pessoas || !cliente_id || !mesa_id) {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/reservasRota/add-reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data_hora, numero_pessoas, cliente_id, mesa_id }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Reserva added successfully!');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to add reserva');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the reserva. Please try again.');
    }
});

// UPDATE
// UPDATE
const updateForm_reserva = document.getElementById('updateForm_reserva'); 

updateForm_reserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_reserva = document.getElementById('UpD_id_reserva')?.value.trim();
    
    const data_hora = document.getElementById('UpD_data_hora_reserva')?.value.trim();
    const numero_pessoas = document.getElementById('UpD_numero_pessoas_reserva')?.value.trim();

    if (!id_reserva ||  !data_hora || !numero_pessoas) {
        alert('All fields (id_reserva, cliente_id, mesa_id, data_hora, numero_pessoas) are required');
        return;
    }

    const updateData = { id_reserva,  data_hora, numero_pessoas };

    try {
        const response = await fetch('http://localhost:3000/reservasRota/update-reserva', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Reserva updated successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update reserva: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the reserva.');
    }
});



// DELETE
// DELETE
const deleteForm_reservas = document.getElementById('deleteForm_reservas');

deleteForm_reservas.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_reserva = document.getElementById('DEL_id_reservas')?.value.trim();

    if (!id_reserva) {
        alert('ID is required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reservasRota/delete-reserva/${id_reserva}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Reserva deleted successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to delete reserva: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the reserva.');
    }
});