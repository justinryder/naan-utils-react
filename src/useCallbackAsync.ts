import { useState, useCallback } from 'react';

const useCallbackAsync =
    <Return>(asyncCallback: (...args: any[]) => Promise<Return>):
        [(...args: any[]) => Promise<Return | null>, Return | null, boolean, Error | null] => {
    const [result, setResult] = useState<Return | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const callback = useCallback(async (...args: any[]) => {
        setError(null);
        setLoading(true);

        try {
            const _result = await asyncCallback(...args);
            setResult(_result);
            return _result;
        } catch (_error) {
            setError(_error as Error);
            throw _error;
        } finally {
            setLoading(false);
        }
    }, [asyncCallback]);

    return [
        callback,
        result,
        loading,
        error
    ];
};

export default useCallbackAsync;
