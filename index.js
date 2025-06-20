        // Load schedule from localStorage
        let schedule = JSON.parse(localStorage.getItem('schedule')) || [];

        // Function to save schedule to localStorage
        function saveSchedule() {
            localStorage.setItem('schedule', JSON.stringify(schedule));
        }

        // Function to display schedule
        function displaySchedule() {
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';
            schedule.forEach((time, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${time}</span>
                    <button class="delete-btn" onclick="deleteTime(${index})">Delete</button>
                `;
                scheduleList.appendChild(li);
            });
        }

        // Function to add a new time
        function addTime() {
            const timeInput = document.getElementById('timeInput').value;
            if (timeInput) {
                schedule.push(timeInput);
                schedule.sort((a, b) => a.localeCompare(b)); // Sort times
                saveSchedule();
                displaySchedule();
                document.getElementById('timeInput').value = '';
            } else {
                alert('Please enter a valid time.');
            }
        }

        // Function to delete a time
        function deleteTime(index) {
            if (confirm('Are you sure you want to delete this time?')) {
                schedule.splice(index, 1);
                saveSchedule();
                displaySchedule();
            }
        }

        // Initial display
        displaySchedule();