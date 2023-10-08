import { useState, useEffect, useCallback } from "react";

export default function useToggleBtnClick(btnRef: HTMLButtonElement | null) {
  const [btnClickedOnce, setBtnClickedOnce] = useState<boolean>(false);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (
        btnClickedOnce &&
        (e.target as Element) !== btnRef &&
        !btnRef?.contains(e.target as Element)
      ) {
        setBtnClickedOnce(false);
      }
    },
    [btnClickedOnce, btnRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return [btnClickedOnce, setBtnClickedOnce] as const;
}
