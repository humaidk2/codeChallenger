// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App';
import router from './router';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  template: '<App/>',
  components: { App },
});
