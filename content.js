console.log('Duolingo Accent Keycode Helper is loaded');
// ADD 5 SECOND WAIT TO LET THE PAGE LOAD

setTimeout(() => {


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

    // Attach the mouseover event to accented character buttons
    document.querySelectorAll('.wQ_9d').forEach(div => {
        console.log('div: ', div);
        // Get the button element inside the div
        const button = div.querySelector('button');
        button.addEventListener('mouseover', showTooltip);
    });

}, 5000);