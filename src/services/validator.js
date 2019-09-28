const publicKey = {
  crv: 'P-256',
  ext: true,
  key_ops: ['verify'],
  kty: 'EC',
  x: 'DG-4eDIHkCdY1fM9al9y_UnPyXwRhVGaZ7ohAm74wRc',
  y: 'EY899N9XaXSejPMBAJ8YpmSmpvPvj0pX8K7D2k7OBn8'
}

export default {
  validators() {
    return [
      {
        key: 'swisslex',
        label: 'Swisslex',
        validated: false
      },
      {
        key: 'schellenberg',
        label: 'Schellenberg Wittmer',
        validated: false
      },
      {
        key: 'kellerhals-carrard',
        label: 'Kellerhals Carrard',
        validated: false
      },
      {
        key: 'niederer-kraft-frey',
        label: 'Niederer Kraft Frey',
        validated: false
      }
    ]
  },

  async validate(signature, data) {
    const key = await window.crypto.subtle.importKey(
      'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      publicKey,
      {
        //these are the algorithm options
        name: 'ECDSA',
        namedCurve: 'P-256' //can be "P-256", "P-384", or "P-521"
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ['verify'] //"verify" for public key import, "sign" for private key imports
    )

    const result = await window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' }
      },
      key,
      new Uint8Array(signature),
      new Uint8Array(data)
    )

    return result
  }
}
