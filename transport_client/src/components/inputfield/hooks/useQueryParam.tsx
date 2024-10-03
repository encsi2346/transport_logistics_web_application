import JSURL from 'jsurl';
import type { NavigateOptions } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useCallback, useMemo} from "react";

function useQueryParam<T>(key: string): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramValue = searchParams.get(key);

    const value = useMemo(() => JSURL.parse(paramValue), [paramValue]);

    const setValue = useCallback(
        (newValue: T, options?: NavigateOptions) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(key, JSURL.stringify(newValue));
            setSearchParams(newSearchParams, options);
        },
        [key, searchParams, setSearchParams]
    );

    return [value, setValue];
}

export default useQueryParam;
