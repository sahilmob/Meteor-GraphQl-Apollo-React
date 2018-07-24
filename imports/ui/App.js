import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ResolutionForm from "./ResolutionForm";
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { withApollo } from 'react-apollo';


const App = ({loading, resolutions, client}) => {
    if (loading) return null;
    return (
        <div>
          <button onClick={ () => {
                                Meteor.logout()
                                client.resetStore();
                            } }>Log out</button>
          <RegisterForm client={ client } />
          <LoginForm client={ client } />
          <ResolutionForm />
          <ul>
            { resolutions.map(res => <li key={ res._id }>
                                       { res.name }
                                     </li>) }
          </ul>
        </div>
        );
};

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(resolutionsQuery, {
    props: ({data}) => ({
        ...data
    })
})(withApollo(App));
