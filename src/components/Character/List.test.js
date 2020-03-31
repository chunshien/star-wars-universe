import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils';

import List from './List';
const testData = require('../../assets/test-data/peoples')

describe('Component - List Test', () => {
    it('renders List without data without crashing', () => {
        const component = renderer.create(
            <List/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders List with data without crashing', () => {
        const component = renderer.create(
            <List
                peoples={testData.results}
                loading={false}
                totalItem={testData.count}
                activePage={1}            
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //mock props function call
    let ListElement;
    let onClickMock = jest.fn();
    let onPageChangedMock = jest.fn();
    class Wrapper extends React.Component {
        render() { 
            return this.props.children
        }
    }

    beforeAll(function() {
        ListElement = TestUtils.renderIntoDocument(
            <Wrapper>
                <List 
                    onClick={onClickMock}
                    onPageChanged={onPageChangedMock}
                />
            </Wrapper>
        );
    });
    beforeEach(function() {
        onClickMock.mockClear();
        onPageChangedMock.mockClear();
    });
    it('Simulate List onClick', () => {
        ListElement.props.children.props.onClick();
        expect(onClickMock).toBeCalled();                
    });

    it('Simulate ProductList onHandlePageChanged', () => {
        ListElement.props.children.props.onPageChanged();
        expect(onPageChangedMock).toBeCalled();     
    });
})