const textArea = document.getElementById('textArea');
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', saveTextToFile);

function saveTextToFile() {
    const textToSave = textArea.value;

    // Try reading the existing file (simulating server-side behavior)
    fetch('dataCollection.json')
        .then(response => response.json())
        .then(existingData => {
            // File exists: Append the new text (you'd need real file writing operations on the server )
            console.log('File exists. Ideally, you would append the text here.');
            console.log('Existing Data:', existingData);
        })
        .catch(error => {
            // File doesn't exist: Create a basic JSON structure
            console.log('File does not exist. Creating a new one.');
            const initialData = {
                textEntries: [textToSave]
            };
            saveAsDownloadableFile(initialData);
        });
}

function saveAsDownloadableFile(data) {
    const dataStr = JSON.stringify(data, null, 2);  // Format JSON nicely
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dataCollection.json';
    document.body.appendChild(link); 
    link.click(); 

    // Cleanup 
    document.body.removeChild(link);
    URL.revokeObjectURL(url); 
}
