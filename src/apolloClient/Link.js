import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import config from '../config/Config';

const { uri, subsUri } = config;
const httpLink = new HttpLink({ uri });
const wsLink = new WebSocketLink({
  uri: subsUri,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default link;
