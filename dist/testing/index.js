"use strict";
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');
// Input data
const message = "Welcome 7b6536ae-9d7e-1c06-16e1-147f981f3caa to Generative";
const privateKeyHex = "84b9af014649f6877f8432214ad13a20553b69211dec9817136b882da2dfd34c";
// Decode the private key from hex
const privateKey = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKeyHex, 'hex'));
// console.log('privateKey: ', privateKey)
// Sign the message with the private key
const signature = bitcoinMessage.sign(message, Buffer.from(privateKeyHex, 'hex'), false, { segwitType: 'p2wpkh' });
console.log("Message:", message);
console.log("Private Key:", privateKeyHex);
console.log("Public Key:", privateKey.publicKey.toString('hex'));
console.log("SignatureBase64:", signature.toString('hex'));
