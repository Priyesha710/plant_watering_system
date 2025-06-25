//initialize the database
database = firebase.database();
console.log('Database initialized.')

// Manual irrigation control
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
// Get current irrigation status
async function getStatus() {
    try {
        const responseRef = database.ref('/');
        responseRef.on("value", function (data) {
            response = data.val();
        })
        const statusDiv = document.getElementById('irrigationStatus');
        const status = response.data.status;
        statusDiv.textContent = `Status: ${status.toUpperCase()}`;
        statusDiv.className = `status ${status}`;
    } catch (error) {
        console.error('Error getting status:', error);
        alert('Failed to get status');
    }
}