// from stellar_sdk import TransactionEnvelope, Network, TextMemo, IdMemo, HashMemo, ReturnHashMemo, Payment

// envelope_xdr = 'AAAAAD11sXdkWzZ8LQrxr5zWXdrI6CK5Pz/+e3RGX8RqzmPYAAAAyAAAAAAAAABlAAAAAAAAAAEAAAAKaGVsbG8gbWVtbwAAAAAAAgAAAAAAAAABAAAAANBtml/avnYRS9MeyvimlMQRJU/oq1JvHfDviocRc6feAAAAAAAAAAA7wO+gAAAAAAAAAAEAAAAAGH7pPQgWjoQcf+QW/EeDjc6Y1T1/j10jRm9kjpyvCXsAAAABWENOAAAAAACHPQ4p8zj3+dCkTJ/erv3iHXpZxAesYy04momcXmgwKwAAAAA7wO+gAAAAAAAAAAFqzmPYAAAAQBDpbZ5Nf6lv2yvxwEF0K7Sxtvft3vojJRrSAGvlnQwn9fHWAK6876/Abb0OtBUOvpxzyNrBagWGttvAiJLbaQU='

// te = TransactionEnvelope.from_xdr(envelope_xdr, Network.TESTNET_NETWORK_PASSPHRASE)
// tx_hash = te.hash_hex()
// print(f"hash: {tx_hash}")
// raw_memo = te.transaction.memo
// memo = None
// if isinstance(raw_memo, TextMemo):
//     memo = raw_memo.memo_text
// if isinstance(raw_memo, IdMemo):
//     memo = raw_memo.memo_id
// if isinstance(raw_memo, HashMemo):
//     memo = raw_memo.memo_hash
// if isinstance(raw_memo, ReturnHashMemo):
//     memo = raw_memo.memo_return
// print(f"memo: {memo}")
// operations = te.transaction.operations
// for op in operations:
//     # You can check other types of operations here.
//     # You can find list of operations here: https://stellar-sdk.readthedocs.io/en/latest/api.html#operation
//     if isinstance(op, Payment):
//         amount = op.amount
//         asset_code = op.asset.code
//         asset_issuer = op.asset.issuer
//         destination = op.destination
//         source = op.source or te.transaction.source.public_key
//         print(f"{source} send {amount} {asset_code}({asset_issuer}) to {destination}")