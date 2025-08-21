export default {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    node: 'current',
                    esmodules: true,
                },
                bugfixes: true,
            },
        ],
    ],
    plugins: [
        [
            'polyfill-corejs3',
            {
                method: 'usage-global',
                version: '3.45',
            },
        ],
    ],
}
