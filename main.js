//initialize the database
database = firebase.database();
async function toggleIrrigation(action) {
    try {
        database.ref('/').update({
            State: action
        })
        // Update status display
        const statusDiv = document.getElementById('irrigationStatus');
        statusDiv.textContent = `Status: ${action.toUpperCase()}`;
        statusDiv.className = `status ${action}`;

        alert(`Irrigation turned ${action.toUpperCase()}`);

    } catch (error) {
        console.error('Error toggling irrigation:', error);
        alert('Failed to control irrigation');
    }

}