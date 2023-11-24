import React, { Component, ReactNode } from 'react';
import ErrorPage from '../pages/error';

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    console.error('Custom Error: ', error);
    this.setState({ hasError: true });
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorPage
          isErrorChange={(hasError: boolean) => this.setState({ hasError })}
        />
      );
    }

    return children;
  }
}
