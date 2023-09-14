import { HttpLink } from "@apollo/client";
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const authLink = setContext((_, { headers }) => {
    // const token = cookies().get("token")?.value;
     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZmN2Y3MjRkYmY0ZTc4ZDFiYjRkNmMiLCJyb2xlIjoiRFJJVkVSIiwiaWF0IjoxNjk0NjE3MzQ0LCJleHAiOjE2OTQ3OTAxNDR9.o8BtlJgI1vqbtUJwOqs_btTGNRYZ7siSuzZQHWxtKD0";

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const Link = authLink.concat(link);

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: Link,
    });
});
