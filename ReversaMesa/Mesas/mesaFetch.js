// SELECT
async function fetchDataSelect_Mesas() {
    try {
        const response = await fetch('http://localhost:3000/mesaRota/data-table'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        const tableBody = document.getElementById('data-table_mesas');
        tableBody.innerHTML = ''; // Clear previous data
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.mesa_id}</td>
                <td>${row.capacidade}</td>
                <td>${row.localizacao}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}

// INSERT
const insertFormMesa = document.getElementById('insert_Form_Mesas'); 

insertFormMesa.addEventListener('submit', async (e) => {
    e.preventDefault();

    const capacidade = document.getElementById('INS_capacidade')?.value.trim();
    const localizacao = document.getElementById('INS_localizacao')?.value.trim();

    if (!capacidade || !localizacao) {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/mesaRota/add-table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ capacidade, localizacao }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Table added successfully!');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to add table');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the table. Please try again.');
    }
});



// UPDATE
const updateForm_Mesa = document.getElementById('updateForm_Mesa'); 

updateForm_Mesa.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('UpD_id_Mesa')?.value.trim();
    const capacidade = document.getElementById('UpD_capacidade')?.value.trim();
    const localizacao = document.getElementById('UpD_localizacao')?.value.trim();
    

    if (!id || !capacidade || !localizacao) {
        alert('All fields (id, capacidade, localizacao) are required');
        return;
    }

    const updateData = { id, capacidade, localizacao };

    try {
        const response = await fetch('http://localhost:3000/mesaRota/update-table', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Table updated successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update Table: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the Table.');
    }
});


// DELETE
const deleteForm_mesa = document.getElementById('deleteForm_mesa');

deleteForm_mesa.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('DEL_id_mesa')?.value.trim();

    if (!id) {
        alert('Field "id" is required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/mesaRota/delete-table/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Table deleted successfully!');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to delete Table: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the Table.');
    }
});

