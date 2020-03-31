import React from 'react';
import ListItem from './ListItem';
import renderer from 'react-test-renderer';
const testData = require('../../assets/test-data/peoples')

describe('Component - ListItem Test', () => {
    it('renders ListItem without data without crashing', () => {
        const component = renderer.create(
            <ListItem/>    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot() 
    })
    it('renders ListItem with data without crashing', () => {    
        const component = renderer.create(
            <ListItem
                data={testData.results[0]}
            />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot() 
    })
})

