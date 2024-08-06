document.addEventListener('DOMContentLoaded', function() {
    // Determine the current page
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.').shift();

    // Fetch the content from the JSON file
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            // Load the content for the current page
            const content = data[page];
            if (content) {
                const contentDiv = document.getElementById('dynamic-content');
                contentDiv.innerHTML = '';

                // Add links
                content.links.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.textContent = link.text;
                    a.target = '_blank';
                    contentDiv.appendChild(a);
                    contentDiv.appendChild(document.createElement('br'));
                });

                // Add images
                content.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    contentDiv.appendChild(img);
                    contentDiv.appendChild(document.createElement('br'));
                });
            }
        })
        .catch(error => console.error('Error loading content:', error));
});
