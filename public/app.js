function handleSubmit() {
    const groupFile = document.getElementById('groupFile').files[0];
    const hostelFile = document.getElementById('hostelFile').files[0];
  
    if (!groupFile || !hostelFile) {
      alert("Please upload both CSV files.");
      return;
    }
  
    const formData = new FormData();
    formData.append('groupFile', groupFile);
    formData.append('hostelFile', hostelFile);
  
    fetch('/api/allocate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => displayResult(data))
    .catch(error => console.error('Error:', error));
  }
  
  function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2 class="text-xl font-bold mb-4">Allocation Result</h2>';

    const table = document.createElement('table');
    table.className = 'min-w-full bg-white border-collapse';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th class="border px-4 py-2">Group ID</th>
            <th class="border px-4 py-2">Hostel Name</th>
            <th class="border px-4 py-2">Room Number</th>
            <th class="border px-4 py-2">Members Allocated</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="border px-4 py-2">${row.groupId}</td>
            <td class="border px-4 py-2">${row.hostelName}</td>
            <td class="border px-4 py-2">${row.roomNumber}</td>
            <td class="border px-4 py-2">${row.membersAllocated}</td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    resultDiv.appendChild(table);

    // Download CSV button functionality
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download CSV';
    downloadButton.className = 'w-full bg-green-500 text-white py-2 rounded shadow-md hover:bg-green-600 mt-4';
    downloadButton.onclick = downloadCSV;
    resultDiv.appendChild(downloadButton);

    // Store data for CSV creation
    resultDiv.dataset.result = JSON.stringify(data);
}

function downloadCSV() {
  const data = JSON.parse(document.getElementById('result').dataset.result);
  
  // Extract column headers from the first object in the data array
  const columns = Object.keys(data[0]);
  
  // Create CSV content with column headers followed by data rows
  let csvContent = "data:text/csv;charset=utf-8," + columns.join(',') + '\n';
  csvContent += data.map(row => columns.map(col => row[col]).join(',')).join('\n');
  
  // Create a data URI for the CSV content
  const encodedUri = encodeURI(csvContent);
  
  // Create an anchor element to trigger the download
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "allocation_result.csv");
  
  // Append the link to the body and click it programmatically
  document.body.appendChild(link);
  link.click();
  
  // Cleanup: Remove the anchor element from the body
  document.body.removeChild(link);
}


  