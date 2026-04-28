"use client";

import { useEffect } from "react";
import {
  useAppearanceStore,
  fontFamilyMap,
  fontSizeMap,
} from "@/store/appearance.store";

export function AppearanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontFamily = useAppearanceStore((s) => s.fontFamily);
  const fontSize = useAppearanceStore((s) => s.fontSize);

  useEffect(() => {
    document.body.style.fontFamily = fontFamilyMap[fontFamily];
    document.body.style.fontSize = fontSizeMap[fontSize];
  }, [fontFamily, fontSize]);

  return <>{children}</>;
}
