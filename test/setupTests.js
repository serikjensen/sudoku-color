require('babel-register')()
const jsdom = require('jsdom')
const enzyme = require('enzyme')
const ReactFifteenAdapter = require('enzyme-adapter-react-15')
const chai = require('chai')

const { JSDOM } = jsdom

const { document } = (new JSDOM('')).window
global.document = document
global.window = document.defaultView

enzyme.configure({ adapter: new ReactFifteenAdapter() })

global.chai = chai
global.assert = chai.assert
global.expect = chai.expect
