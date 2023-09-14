'use client';

import React from 'react';
import Cookies from 'js-cookie';

import { ApolloLink, HttpLink, split } from '@apollo/client';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


const makeClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        const token = await Cookies.get('token');

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });


    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_BACKEND_URL,
        fetchOptions: { cache: 'no-store' },
    });

    // const wsLink = new WebSocketLink({
    //     uri: process.env.NEXT_PUBLIC_BACKEND_URL_WS!,
    //     options: {
    //         reconnect: true,
    //     },
    // });

    // const Link = split(
    //     ({ query }) => {
    //         const definition = getMainDefinition(query)

    //         return (
    //             definition.kind === 'OperationDefinition' &&
    //             definition.operation === 'subscription'
    //         )
    //     },
    //     wsLink,
    //     authLink.concat(httpLink),
    // )

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                    new SSRMultipartLink({ stripDefer: true }),
                    authLink.concat(httpLink),
                ])
                : authLink.concat(httpLink),
    });
};

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
};

export default Providers;
