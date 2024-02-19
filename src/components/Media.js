import config from "../config/config";
import { useEffect, useState } from "react";
import useWindowSize from "../hook/useWindowSize";

/**
 * @description 根據 瀏覽器的寬度(windowSize.width) & 參數(MOBILE / PC) 決定render的組件
 */

const _device = {
  MOBILE: "mobile",
  PC: "pc",
};
export default function Media({ MOBILE = false, PC = false, children }) {
  const [targetDevice, setTargetDevice] = useState("");
  const windowSize = useWindowSize();
  useEffect(() => {
    const device =
      windowSize.width >= config.BREAK_POINT ? _device.PC : _device.MOBILE;
    setTargetDevice(device);
  }, [windowSize]);
  return (
    <>
      {(MOBILE && targetDevice === _device.MOBILE) ||
      (PC && targetDevice === _device.PC)
        ? children
        : null}
    </>
  );
}
