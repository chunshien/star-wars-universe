import React from 'react';
import renderer from 'react-test-renderer';

import Details from './Details';
const testData = require('../../assets/test-data/details')

describe('Component - Details Test', () => {
    it('renders Details without data without crashing', () => {
        const component = renderer.create(
            <Details/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders Details with data without crashing', () => {
        const component = renderer.create(
            <Details
                details={testData}                           
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})