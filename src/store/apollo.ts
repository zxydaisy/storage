import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./link";

const client = new ApolloClient({
  /**
   * 需要配置 credentials, controller/graphql 的 post 方法才能直接请求 http://localhost:8000/grapql
   */
  link,
  cache: new InMemoryCache()
});

export { client };
