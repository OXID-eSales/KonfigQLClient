import ReactDOM from "react-dom";
import React from "react";
import App from "./app";
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
    url: 'http://graphql.test/graphql'
});

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
            </div>
    );
}

function App1() {
    return (
            <ClientContext.Provider value={client}>
            {/* children */}
            <App/>
            </ClientContext.Provider>
    );
}

ReactDOM.render(<App1/>, document.getElementById('root'));

// let q = {
//     "query": "query {products { id  title}}"
// };

// fetch('http://graphql.test/graphql', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     body: JSON.stringify(q)
// })
//     .then(r => r.json())
//     .then(data => console.log('data returned:', data));
