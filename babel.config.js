export default {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
                bugfixes: true,
            },
        ],
    ],
    plugins: [
        ['polyfill-corejs3', { method: 'usage-global', version: '3.45' }],
    ],
}
