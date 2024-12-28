module.exports = {
    presets: [
        // Convert modern JavaScript features to compatible versions
        ['@babel/preset-env', { targets: { node: 'current' } }],

        // Handle React and JSX syntax
        ['@babel/preset-react', { runtime: 'automatic' }]
    ],
};