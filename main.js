// Manual irrigation control
var firebaseConfig = {
    apiKey: "AIzaSyBgHHmXXRkqfQxs7HRqfQvIJkwK5kq9vuQ",
    authDomain: "iotbasedplantwateringsystem.firebaseapp.com",
    databaseURL: "https://iotbasedplantwateringsystem-default-rtdb.firebaseio.com",
    projectId: "iotbasedplantwateringsystem",
    storageBucket: "iotbasedplantwateringsystem.firebasestorage.app",
    messagingSenderId: "591617339211",
    appId: "1:591617339211:web:51e2a390937a064a4242ce",
    measurementId: "G-NEX5420GGQ"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
async function toggleIrrigation(action) {
    try {
        //Update Database
        database.ref('/').update({
            state: action
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
    var status;
    try {
        
        database.ref('/status').on("value", function(data){
            status = data.val();
        });
        const statusDiv = document.getElementById('irrigationStatus');
        statusDiv.textContent = `Status: ${status.toUpperCase()}`;
        statusDiv.className = `status ${status}`;
    } catch (error) {
        console.error('Error getting status:', error);
        alert('Failed to get status');
    }
}