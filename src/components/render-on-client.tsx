import React, { Component } from 'react';

/*
Unfortunately gatsby assumes server and first client render are identical.
Therefore it doesn't rerender components on client side even their props have changed.

Check this issue for more information:
https://github.com/gatsbyjs/gatsby/issues/12413#issuecomment-470987990
*/
const renderOnClient = (ComposedComponent: React.FC<T>) => class RenderOnClient extends Component<T> {
    state = {
        isClient: false,
    }

    componentDidMount() {
        this.setState({
            isClient: true,
        });
    }

    render() {
        const {
            isClient,
        } = this.state;

        return isClient ? <ComposedComponent { ...this.props } /> : null;
    }
};

export default renderOnClient;
