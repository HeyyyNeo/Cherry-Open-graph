console.log('Hello, World!');
console.log('Welcome to your Node.js project!');

// Simple function example
function greet(name) {
    return `Hello, ${name}!`;
}

// Example usage
const userName = 'Developer';
console.log(greet(userName));

// Export for potential module usage
module.exports = {
    greet
};
