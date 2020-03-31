import React from 'react';
import Pagination from './Pagination.js';
import renderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils';

const activePageStyle = {
    backgroundColor: 'white',
    borderBottom: '5px solid black'
};

const enabledPageNavigation = {
    color: 'black'
}

const disabledPageNavigation = {
    color: '#dddddd',
    cursor: 'not-allowed'
}

describe('Component - Pagination Test', () => {
    it('renders Pagination without crashing', () => {
        const component = renderer.create(
            <Pagination />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()        
    });
    
    let PaginationElement
    let onChangedMock = jest.fn();
    class Wrapper extends React.Component {
        render() { 
            return this.props.children
        }
    }
    beforeAll(function() {
        PaginationElement = TestUtils.renderIntoDocument(<Wrapper><Pagination onChanged={onChangedMock}/></Wrapper>);
    });
    beforeEach(function() {
        onChangedMock.mockClear();
    });

    it('Simulate Pagination onChanged', () => {
        PaginationElement.props.children.props.onChanged();
        expect(onChangedMock).toBeCalled();        
    });

    it('Test Pagination 3 pages - page 1 active (first)', () => {
        const component = renderer.create(
            <Pagination 
                totalItem={20}
                itemCountPerPage={8}
                activePage={1}                            
            />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()  
        
        //test previous page
        expect(tree.children[0].children[0]).toEqual('< Previous page')
        expect(tree.children[0].props.style).toEqual(disabledPageNavigation)
        
        //test first index page
        expect(tree.children[1].children[0]).toEqual('1')
        expect(tree.children[1].props.style).toEqual(activePageStyle) // active page
        
        //test second index page        
        expect(tree.children[2].children[0]).toEqual('2')
        expect(tree.children[2].props.style).toEqual({})
        
        //test third index page                
        expect(tree.children[3].children[0]).toEqual('3')
        expect(tree.children[3].props.style).toEqual({})

        //test next page                
        expect(tree.children[4].children[0]).toEqual('Next page >')
        expect(tree.children[4].props.style).toEqual(enabledPageNavigation)
    });

    it('Test Pagination 3 pages - page 2 active (second index)', () => {
        const component = renderer.create(
            <Pagination 
                totalItem={20}
                itemCountPerPage={8}
                activePage={2}                            
            />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()  
        
        //test previous page
        expect(tree.children[0].children[0]).toEqual('< Previous page')
        expect(tree.children[0].props.style).toEqual(enabledPageNavigation)
        
        //test first index page
        expect(tree.children[1].children[0]).toEqual('1')
        expect(tree.children[1].props.style).toEqual({})
        
        //test second index page        
        expect(tree.children[2].children[0]).toEqual('2')
        expect(tree.children[2].props.style).toEqual(activePageStyle) // active page
        
        //test third index page                
        expect(tree.children[3].children[0]).toEqual('3')
        expect(tree.children[3].props.style).toEqual({})

        //test next page                
        expect(tree.children[4].children[0]).toEqual('Next page >')
        expect(tree.children[4].props.style).toEqual(enabledPageNavigation)       
    });

    it('Test Pagination 3 pages - page 3 active (last)', () => {
        const component = renderer.create(
            <Pagination 
                totalItem={20}
                itemCountPerPage={8}
                activePage={3}                            
            />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()  
        
        //test previous page
        expect(tree.children[0].children[0]).toEqual('< Previous page')
        expect(tree.children[0].props.style).toEqual(enabledPageNavigation)
        
        //test first index page
        expect(tree.children[1].children[0]).toEqual('1')
        expect(tree.children[1].props.style).toEqual({})
        
        //test second index page        
        expect(tree.children[2].children[0]).toEqual('2')
        expect(tree.children[2].props.style).toEqual({})
        
        //test third index page                
        expect(tree.children[3].children[0]).toEqual('3')
        expect(tree.children[3].props.style).toEqual(activePageStyle) // active page

        //test next page                
        expect(tree.children[4].children[0]).toEqual('Next page >')
        expect(tree.children[4].props.style).toEqual(disabledPageNavigation)
    });

    it('Test Pagination 4 pages - page 3 active (second index)', () => {
        const component = renderer.create(
            <Pagination 
                totalItem={26}
                itemCountPerPage={8}
                activePage={3}                            
            />    
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()  
        
        //test previous page
        expect(tree.children[0].children[0]).toEqual('< Previous page')
        expect(tree.children[0].props.style).toEqual(enabledPageNavigation)
        
        //test first index page
        expect(tree.children[1].children[0]).toEqual('2')
        expect(tree.children[1].props.style).toEqual({})
        
        //test second index page        
        expect(tree.children[2].children[0]).toEqual('3')
        expect(tree.children[2].props.style).toEqual(activePageStyle) // active
        
        //test third index page                
        expect(tree.children[3].children[0]).toEqual('4')
        expect(tree.children[3].props.style).toEqual({})

        //test next page                
        expect(tree.children[4].children[0]).toEqual('Next page >')
        expect(tree.children[4].props.style).toEqual(enabledPageNavigation)       
    });
})