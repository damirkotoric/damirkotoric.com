import { useCallback, useState } from "react";

/**
 * Tracks how many images have loaded. Returns `ready` once all expected
 * images have fired their onLoad callback, and a single `onImageLoad`
 * handler to attach to each <Image onLoad={onImageLoad} />.
 */
export function useImagesLoaded(count: number) {
  const [loaded, setLoaded] = useState(0);
  const onImageLoad = useCallback(() => setLoaded((n) => n + 1), []);
  return { ready: loaded >= count, onImageLoad };
}
