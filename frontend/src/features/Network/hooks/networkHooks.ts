import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setNetwork } from "../networkSlice";
import { ConnectionStatus, Network } from "@capacitor/network";
import { useCallback, useEffect } from "react";

const useNetworkManager = () => {
  const changeNetwork = useConfigureNetwork();
  const state = useNetwork();

  useEffect(() => {
    const changeStatus = async () => changeNetwork(await Network.getStatus());
    Network.addListener("networkStatusChange", changeStatus);
    changeStatus();

    return () => {
      Network.removeAllListeners();
    };
  }, [changeNetwork]);

  return [state, changeNetwork] as [typeof state, typeof changeNetwork];
};
export default useNetworkManager;

/** Hook for configuring network state */
export const useConfigureNetwork = () => {
  const dispatch = useDispatch();
  const changeNetwork = useCallback(
    (networkProperties: ConnectionStatus) =>
      dispatch(setNetwork(networkProperties)),
    [dispatch]
  );
  return changeNetwork;
};

/** Hook for getting current network state */
export const useNetwork = () => {
  return useSelector((state: RootState) => state.network);
};
