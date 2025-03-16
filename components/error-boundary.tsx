'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <Card className="w-full max-w-md p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icons.warning className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={this.handleReload} variant="outline">
                <Icons.refresh className="h-4 w-4 mr-2" />
                Try again
              </Button>
              <Button asChild>
                <a href="/">
                  <Icons.home className="h-4 w-4 mr-2" />
                  Go home
                </a>
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
} 