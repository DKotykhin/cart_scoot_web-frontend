'use client';

import React from 'react';
import { ApolloLink, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';

import Cookies from 'js-cookie';

const makeClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        // const token = await Cookies.get('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZmN2Y3MjRkYmY0ZTc4ZDFiYjRkNmMiLCJyb2xlIjoiRFJJVkVSIiwiaWF0IjoxNjk0NjE3MzQ0LCJleHAiOjE2OTQ3OTAxNDR9.o8BtlJgI1vqbtUJwOqs_btTGNRYZ7siSuzZQHWxtKD0";

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    // const wsLink = new WebSocketLink({
    //     uri: process.env.NEXT_PUBLIC_BACKEND_URL_WS || '',
    //     options: {
    //         reconnect: true,
    //     },
    // });

    const link = new HttpLink({
        uri: process.env.NEXT_PUBLIC_BACKEND_URL || '',
        fetchOptions: { cache: 'no-store' },
    });

    const Link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);

            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        // wsLink,
        authLink.concat(link),
    );

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                    new SSRMultipartLink({ stripDefer: true }),
                    Link,
                ])
                : Link,
    });
};

const ApolloProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
};

export default ApolloProvider;