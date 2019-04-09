import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const GETUSER = gql`
  query UserDetails($name: String!, $email: String!) {
    login(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
class GetUser extends Component {

  render() {
    const { data, history } = this.props;
    const { name, email } = data;
    return (
      <>
        <Query query={GETUSER} variables={{ name, email }}>
          {({ data, loading, error }) => {
            console.log('loading', loading , 'error', error, 'data>>>>>>>>>>>>>', data)
            if (loading) return <div>{JSON.stringify(loading)}</div>;
            if (error) {this.props.handle(); return <p>Please Enter valid Username and Email</p>;}
            if (data.login) {
              history.push(`/Start/${name}`);
              return null;
            }
            return null;
          }}
        </Query>
      </>
    );
  }
}
export default GetUser;
