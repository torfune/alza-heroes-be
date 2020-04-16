import { Db } from 'mongodb'

async function getNextSequenceId(db: Db, name: string) {
  const col = db.collection<{ _id: string; sequenceValue: number }>('sequences')
  const doc = await col.findOneAndUpdate(
    { _id: name },
    { $inc: { sequenceValue: 1 } }
  )

  if (doc.value) {
    return doc.value.sequenceValue
  }

  await col.insertOne({
    _id: name,
    sequenceValue: 0,
  })
  return 0
}

export default getNextSequenceId
