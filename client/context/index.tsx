import { SmartContract, useAddress, useContract } from "@thirdweb-dev/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  
} from "react";
import {contractAbi} from '../src/constants';
export interface Auth {
  address: string | undefined;
  Contract: SmartContract | undefined;
  IsOrg: boolean;
  loading: boolean | undefined;
}

export const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract(
    "0x645e8D604c0b0E3DFbE869bEfB48BA2520f85eF3",contractAbi
  );

  const _address = useAddress();
  const [IsOrganization, setIsOrganization] = useState(false);
  const [Loading, setLoading] = useState<boolean>();

  const [auth, setAuth] = useState<Auth>({
    address: _address,
    Contract: contract,
    IsOrg: false,
    loading: true,
  });

  useEffect(() => {
    const getOrganization = async () => {
      try {
        if (contract && _address) {
          setLoading(true);
          console.log(contract);
          const data = await contract.call("isOrganization", [_address]);
          setIsOrganization(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!IsOrganization) getOrganization();

    setAuth({
      address: _address,
      Contract: contract,
      IsOrg: IsOrganization,
      loading: Loading,
    });
  }, [_address, IsOrganization, contract]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (auth == undefined) {
    throw new Error("Auth Object Exists..");
  }

  return auth;
};
