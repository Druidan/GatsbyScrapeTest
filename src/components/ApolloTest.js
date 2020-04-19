import React from "react"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const ApolloTest = () => {

    const sayHi = <Query
        query={gql`
        {
            hello
        }
        `}
    >
        {({ data }) =>
        <div>A greeting from the server: {data.hello}</div>}
    </Query>
    
    return sayHi
}

export default ApolloTest