/// <reference types="node" />
import { BIP32Interface } from "bip32";
declare function signBitcoinSegwitKey({ signMessage, root }: {
    signMessage: string;
    root: BIP32Interface;
}): Promise<{
    privateKey: Buffer;
    pubKey: Buffer;
    address: string | undefined;
    signature: Buffer;
    signMessagePrefix: string | undefined;
    signMessage: string;
}>;
export { signBitcoinSegwitKey };
