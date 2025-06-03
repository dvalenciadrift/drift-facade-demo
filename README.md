# Drift Facade Demo

A demonstration of a custom implementation for the Drift chat widget UI using a facade pattern.

## Overview

This project showcases how to create a custom interface for the Drift chat widget while maintaining all the core functionality. The facade pattern allows for complete control over the visual appearance and user experience of the chat widget.

## Project Structure

- `demo.html` - Main demo page that showcases the custom Drift implementation
- `drift.js` - Core Drift functionality integration
- `facade.js` - Custom facade implementation that controls the UI/UX
- `style/`
  - `facade.css` - Styling for the custom Drift interface
  - `style.css` - General styling for the demo page
- `img/` - Contains all image assets:
  - `drift_bot.png` - Bot avatar image
  - `drift-close-button.svg` - Close button icon
  - `drift-icon.svg` - Drift logo
  - `yes.svg` - Affirmative response icon
  - `no.svg` - Negative response icon

## Getting Started

1. Clone this repository
2. Open `demo.html` in your browser
3. Interact with the custom Drift chat interface

## Implementation Details

The project uses a facade pattern to create a custom UI layer on top of the standard Drift widget. This approach allows for:

- Complete customization of the appearance
- Control over the chat flow and user experience
- Maintaining core Drift functionality
- Easy integration with existing websites

## Browser Compatibility

This demo has been tested on modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

[MIT License](https://opensource.org/licenses/MIT)