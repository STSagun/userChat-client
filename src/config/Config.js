const envVars = process.env;
const config = {
   uri: `${`http://localhost:5000`}/graphql`, // eslint-disable-line max-len
   subsUri: `${`ws://localhost:5000`}/graphql`, // eslint-disable-line max-len
};

export default config;
