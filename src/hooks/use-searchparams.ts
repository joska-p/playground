type ParamKey = string;
type ParamValue = string;
type Param = { key: ParamKey; value: ParamValue };

const useSearchParams = () => {
  const storeParam = (params: Param): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(params.key, params.value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    history.pushState({}, "", newUrl);
  };

  const getParam = (key: ParamKey): ParamValue | null => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key);
  };

  const removeParam = (key: ParamKey): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    const newUrl = searchParams.toString() ? `${location.pathname}?${searchParams.toString()}` : location.pathname;
    history.pushState({}, "", newUrl);
  };

  const clearParams = (): void => {
    history.pushState({}, "", location.pathname);
  };

  const getAllParams = (): string[] => {
    const searchParams = new URLSearchParams(location.search);
    return Array.from(searchParams.keys());
  };

  return { storeParam, getParam, removeParam, clearParams, getAllParams };
};

export { useSearchParams };
