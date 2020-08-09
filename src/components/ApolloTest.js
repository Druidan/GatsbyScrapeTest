import React from "react"
import { Query, useLazyQuery } from "react-apollo"
import { gql } from "apollo-boost"

const ApolloTest = () => {

    const sayHi = 
    <Query
        query={gql`
        {
            hello
        }
        `}
    >
        {({ data }) =>
            data.hello ? <div>A greeting from the server: {data.hello}</div> : 
           <div>The server doesn't like you.</div>
        }
    </Query>
    
    return sayHi
}

export default ApolloTest