import js from '@eslint/js'
import ts from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default ts.config(
  js.configs.recommended
, ...ts.configs.recommended
, {
    plugins: {
      react
    , reactHooks
    }
  , rules: {}
  }
)
