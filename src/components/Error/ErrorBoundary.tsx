import React, { Component, ReactNode } from 'react';
import ErrorComponent from './ErrorComponent';

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
        <ErrorComponent
          isErrorChange={(hasError: boolean) => this.setState({ hasError })}
        />
      );
    }

    return children;
  }
}
