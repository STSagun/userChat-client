import { MockedProvider } from 'react-apollo/test-utils';
import  GetUser, { GETUSER } from '../GetUser';
import renderer from 'react-test-renderer';

// import React from 'react-router-dom';
import React from 'react';
const wait = require('waait');

const mocks = [
    {
            request: {
                query: GETUSER,
                variables:{ name: 'John', email: 'Sagunsaluja13@gmail.com' },
            },
            result: {
                login: {id: 0, name: "John", email: "sagunsaluja13@gmail.com", __typename: "User"}

            }
    }
];

it('render without Errors', () => {
    renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <GetUser data={ {
        name: "John",
        email: "Sagunsaluja13@gmail.com"
      }}/>
        </MockedProvider>

    )
})
it('should render loading state initially', ()=>{
    const component = renderer.create(
        <MockedProvider mocks={[]}> <GetUser data={ {
            name: "John",
            email: "Sagunsaluja13@gmail.com"
          }}/> </MockedProvider>
    )
    const tree = component.toJSON();
    expect(tree.children).toContain(true);
});

it('should show error UI', async () => {
    const userMock = {
      request: {
        query: GETUSER,
        variables: { name: 'John', email: 'Sagunsaluja13@gmail.com' },
      },
      error: new Error('aw shucks'),
    };
  
    const component = renderer.create(
      <MockedProvider mocks={[userMock]} addTypename={false}>
        <GetUser name="Buck" />
      </MockedProvider>,
    );
  
    await wait(0); // wait for response
  
    const tree = component.toJSON();
    expect(tree.children).toContain(<p>Please Enter valid Username and Email</p>);
  });