import React from 'react';

const renderLoadingDefault = () => <div>Loading...</div>;

const renderErrorDefault = (error: Error) => <div>Error: {error.message}</div>;

type LoadingErrorOrDataProps = React.PropsWithChildren<{
    children?: React.ReactNode,
    loading?: boolean;
    error?: Error | null;
    data?: any | null;
    renderLoading?: () => JSX.Element | string;
    renderError?: (error: Error) => JSX.Element | string;
    renderData?: (data: any) => JSX.Element | string;
}>;

const LoadingErrorOrData: React.FC<LoadingErrorOrDataProps> = ({
    children,
    loading,
    error,
    data,
    renderLoading = renderLoadingDefault,
    renderError = renderErrorDefault,
    renderData,
}) => {
    if (loading) {
        return <>{renderLoading()}</>;
    }

    if (error) {
        return <>{renderError(error)}</>;
    }

    if (data && renderData) {
        return <>{renderData(data)}</>;
    }

    return <>{children}</>;
};

export default LoadingErrorOrData;
