module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "ignorePatterns": ["dist/", "node_modules/", "docs/"],
    "extends": [
        "eslint:recommended",
        "plugin:jsdoc/recommended"
    ],
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "extends": [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:jsdoc/recommended-typescript"
            ],
            "parser": "@typescript-eslint/parser",
            "plugins": [
                "@typescript-eslint",
                "jsdoc"
            ]
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "jsdoc"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1,
                "ignoreComments": true
            }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": "off",
        "no-useless-catch": 0,
        "no-irregular-whitespace": [
            "error",
            {
                "skipComments": true,
                "skipStrings": true,
                "skipRegExps": true,
                "skipTemplates": true
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_"
            }
        ],
        "prefer-const": "error",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-var-requires": "off",
        // "@typescript-eslint/strict-boolean-expressions": [
        //     2,
        //     {
        //         "allowString": false,
        //         "allowNumber": false
        //     }
        // ]
    }
};