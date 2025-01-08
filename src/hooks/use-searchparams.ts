type ParamKey = string;
type ParamValue = string;
type Param = { key: ParamKey; value: ParamValue };

const useSearchParams = () => {
  const storeParam = (params: Param): void => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(params.key, params.value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const getParam = (key: ParamKey): ParamValue | null => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  };

  const removeParam = (key: ParamKey): void => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    const newUrl = searchParams.toString()
      ? `${window.location.pathname}?${searchParams.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

  const clearParams = (): void => {
    window.history.pushState({}, "", window.location.pathname);
  };

  const getAllParams = (): string[] => {
    const searchParams = new URLSearchParams(window.location.search);
    return Array.from(searchParams.keys());
  };

  return { storeParam, getParam, removeParam, clearParams, getAllParams };
};

export { useSearchParams };
