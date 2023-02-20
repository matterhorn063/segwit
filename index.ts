import { BIP32Interface } from "bip32";
import * as bitcoin from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';

const defaultPathSegwit = "m/84'/0'/0'/0/0";


async function signBitcoinSegwitKey({ signMessage, root }: { signMessage: string, root: BIP32Interface }) {
    const childSegwit = root.derivePath(defaultPathSegwit);
    const keyPair = bitcoin.ECPair.fromWIF(childSegwit.toWIF());

    const privateKey = childSegwit.privateKey as Buffer;
    const pubKey = childSegwit.publicKey as Buffer;
    const signature = bitcoinMessage.sign(signMessage, keyPair.privateKey as Buffer, keyPair.compressed, '', {
        segwitType: "p2sh(p2wpkh)"
    });
    const { address: sendAddressSegwit, network } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
    const messagePrefix = network?.messagePrefix;
    const magicHash = bitcoinMessage.magicHash(signMessage);
    const isVerify = bitcoinMessage.verify(signMessage, sendAddressSegwit as string, signature, messagePrefix, true)

    return {
        privateKey,
        pubKey,
        address: sendAddressSegwit,
        signature,
        signMessagePrefix: messagePrefix,
        signMessage,
        magicHash,
        isVerify
    };
}

export {
    signBitcoinSegwitKey
};