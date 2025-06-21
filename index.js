const API_BASE = 'https://irrigation-backend-rjv7.onrender.com/api';
//initializing the database
var database = firebase.database();
        // Global schedule variable
        let schedule = [];

        // Load schedule from API
        async function loadSchedule() {
            console.log("Trying to get from ${API_BASE}/schedules ")
            try {
                const response = await axios.get(`${API_BASE}/schedules`);
                schedule = response.data;
                console.log(response, schedule);
                displaySchedule();
                console.log('Schedule loaded:', schedule);
            } catch (error) {
                console.error('Error loading schedule:', error);
                schedule = [];
                displaySchedule();
            }
        }

        // Save schedule to API
        async function saveSchedule() {
            try {
                await axios.post(`${API_BASE}/schedules`, { 
                    schedules: schedule 
                });
                console.log('Schedule saved successfully!');
            } catch (error) {
                console.error('Error saving schedule:', error);
                alert('Failed to save schedule. Please try again.');
            }
        }

        // Display schedule
        function displaySchedule() {
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';
            
            if (schedule.length === 0) {
                scheduleList.innerHTML = '<li>No schedules yet</li>';
                return;
            }
            
            schedule.forEach((time, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${time}</span>
                    <button class="delete-btn" onclick="deleteTime(${index})">Delete</button>
                `;
                scheduleList.appendChild(li);
            });
        }

        // Add a new time
        async function addTime() {
            const timeInput = document.getElementById('timeInput').value;
            if (timeInput) {
                schedule.push(timeInput);
                schedule.sort((a, b) => a.localeCompare(b)); // Sort times
                
                await saveSchedule();
                displaySchedule();
                document.getElementById('timeInput').value = '';
            } else {
                alert('Please enter a valid time.');
            }
        }

        // Delete a time
        async function deleteTime(index) {
            if (confirm('Are you sure you want to delete this time?')) {
                schedule.splice(index, 1);
                await saveSchedule();
                displaySchedule();
            }
        }

        // Manual irrigation control
        async function toggleIrrigation(action) {
            try {
                const response = await axios.post(`${API_BASE}/devices/toggle`, { action });
                console.log('Irrigation toggled:', response.data);
                
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
                const response = await axios.get(`${API_BASE}/devices/status`);
                console.log('Current status:', response.data);
                
                const statusDiv = document.getElementById('irrigationStatus');
                const status = response.data.status;
                statusDiv.textContent = `Status: ${status.toUpperCase()}`;
                statusDiv.className = `status ${status}`;
            } catch (error) {
                console.error('Error getting status:', error);
                alert('Failed to get status');
            }
        }

        // Initialize the page
        window.onload = function() {
            loadSchedule();
            getStatus();
        };