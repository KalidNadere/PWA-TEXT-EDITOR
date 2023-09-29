const butInstall = document.getElementById('buttonInstall');

let deferredPrompt

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent default installation prompt
  event.preventDefault();

  // Store event to trigger it later
  deferredPrompt = event;

  // Store installation button
  butInstall.style.display = 'block';
});

// TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if there is deferred prompt
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    
    // Wait for user's choice (accept or dismiss)
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }

    // Reset the deferred prompt variable
    deferredPrompt = null;

    // Hide the installation button
    butInstall.style.display = 'none';
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // PWA has been successfully installed
  console.log('PWA installed on the user choice');
  
});
