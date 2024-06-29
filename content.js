console.log('Duolingo Accent Keycode Helper is loading...');
// Define a mapping of accented characters to their keycodes
const accentKeycodes = {
    // Accents to the right
    // Lowercase vowels
    'á': 'Option+E, A',
    'é': 'Option+E, E',
    'í': 'Option+E, I',
    'ó': 'Option+E, O',
    'ú': 'Option+E, U',
    'ñ': 'Option+N, N',
    'ü': 'Option+U, U',
    // Uppercase vowels
    'Á': 'Option+E, Shift+A',
    'É': 'Option+E, Shift+E',
    'Í': 'Option+E, Shift+I',
    'Ó': 'Option+E, Shift+O',
    'Ú': 'Option+E, Shift+U',
    'Ñ': 'Option+N, Shift+N',
    'Ü': 'Option+U, Shift+U',
    // Accents to the left
    // Lowercase vowels
    'à': 'Option+`, A',
    'è': 'Option+`, E',
    'ì': 'Option+`, I',
    'ò': 'Option+`, O',
    'ù': 'Option+`, U',
    // Uppercase vowels
    'À': 'Option+`, Shift+A',
    'È': 'Option+`, Shift+E',
    'Ì': 'Option+`, Shift+I',
    'Ò': 'Option+`, Shift+O',
    'Ù': 'Option+`, Shift+U',

};

// Check for document.readyState === "interactive" before running the script
// This is necessary because the script is injected into the page and may miss the DOMContentLoaded event
// if the page is already loaded when the script is injected.   
let applicationReady = false;
let foundAccentButtons = false;
while (!applicationReady) {
    if (document.readyState === "interactive") {
        applicationReady = true;
        scanForAccentButtons();
        break;
    }
}

// Function to create and show the tooltip
function showTooltip(event) {
    // The event is triggered on the mousover of the button.
    // Inside the button is a span with an accented character.

    // Get the accented character from the button's span
    const span = event.target.querySelector('span');
    if (!span) {
        console.log('No span found in button: ', event.target);
        return;
    } else {
        console.log('span found: ', span);
    }

    const char = span.textContent;
    const keycode = accentKeycodes[char];

    if (!keycode) {
        console.log('No keycode found for character: ', char);
        return;
    }

    if (keycode) {
        let tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = 'Keycode: ' + keycode;
        document.body.appendChild(tooltip);

        // Position the tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

        // Remove the tooltip on mouseout
        event.target.addEventListener('mouseout', () => {
            tooltip.remove();
        }, { once: true });
    }
}

/**
 * Function to scan the page for accented character buttons and attach the mouseover event to them
 * The function runs every 2 seconds to account for the dynamic loading of the buttons as you progress through the lesson
 */
function scanForAccentButtons() {
    setInterval(() => {
        // Attach the mouseover event to accented character buttons
        document.querySelectorAll('.wQ_9d').forEach(div => {
            // Get the button element inside the div
            const button = div.querySelector('button');
            button.addEventListener('mouseover', showTooltip);
            foundAccentButtons = true;
        });
    }, 2000);
}