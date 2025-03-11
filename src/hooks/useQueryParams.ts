/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

type UpdateQueryParams = {
  [key: string]: string | null;
};

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hàm để lấy giá trị của một param
  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  // Hàm để lấy tất cả giá trị trên param
  const getAllParams = useCallback(() => {
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    return paramsObj;
  }, [searchParams]);

  // Hàm để cập nhật searchParams, có thể thêm, thay đổi hoặc xoá param
  const updateParams = useCallback(
    (newParams: UpdateQueryParams) => {
      const currentParams = new URLSearchParams(searchParams as any);
      let isChanged = false;

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          if (currentParams.has(key)) {
            currentParams.delete(key);
            isChanged = true;
          }
        } else {
          if (currentParams.get(key) !== value) {
            currentParams.set(key, value);
            isChanged = true;
          }
        }
      });

      // Chỉ cập nhật URL nếu có thay đổi thực sự
      if (isChanged) {
        router.replace(`?${currentParams.toString()}`, { scroll: false });
      }
    },
    [router, searchParams],
  );

  // Hàm để xoá toàn bộ params
  const clearParams = useCallback(() => {
    router.replace(`${pathname}`, { scroll: false });
  }, [router, pathname]);

  return useMemo(
    () => ({
      getParam,
      getAllParams,
      updateParams,
      clearParams,
    }),
    [getParam, getAllParams, updateParams, clearParams],
  );
};
