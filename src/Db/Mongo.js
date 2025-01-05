/* eslint-disable no-undef */
//see all database
//-->show dbs
// create or access a db
//--> use [db-name]
//read all collections
// --> show collections
// -> two ways
// 1. db.createCollection("task")
// 2. db.(collectionName).insertMany([])

db.task.insertMany([
  {
    createdTime: 1734761151675,
    text: "adding New Task",
    completed: true,
  },
  {
    createdTime: 1734761482793,
    text: "Adding Another Task",
    completed: false,
  },
  {
    createdTime: 1734844351,
    text: "text 5",
    completed: false,
  },
  {
    createdTime: 1734844291,
    text: "text 6",
    completed: false,
  },
  {
    createdTime: 1734844231,
    text: "text 7",
    completed: false,
  },
  {
    createdTime: 1734844171,
    text: "text 8",
    completed: false,
  },
  {
    createdTime: 1734844111,
    text: "text 9",
    completed: false,
  },
]);

//find the data
db.task.find();
db.task.find({ completed: true });
db.task.find({ _id: ObjectId("677a19ade1f45f88404eeb86") });
db.task.find().sort({ createdTime: 1 }); //1 : dec -1 asc
db.task.find({ createdTime: { $gt: 1734844111 } }); //greater then
db.task.find({ createdTime: { $lt: 1734844111 } }); //lesser than
db.task.find({ createdTime: { $gte: 1734844111 } }); //greater then
db.task.find({ createdTime: { $lte: 1734844111 } }); //lesser than
db.task.find({ completed: false }).count(); //count
db.task.find({ createdTime: { $gt: 1734844171, $lt: 1734761151675 } }); //in
db.task.find({
  createdTime: { $not: { $gt: 1734844171, $lt: 1734761151675 } },
}); //not
db.task.find({
  $or: [
    { createdTime: { $gt: 1734844171, $lt: 1734761151675 } },
    { completed: true },
  ],
}); //or

//update
db.task.updateOne(
  { _id: ObjectId("677a19ade1f45f88404eeb87") },
  { $set: { completed: true } }
);
//delete
db.task.deleteOne({ _id: ObjectId("677a19ade1f45f88404eeb8c") });

db.task
  .aggregate([
    {
      $group: {
        _id: "$text",
        duplicate: { $addToSet: "$_id" },
        totalCount: { $sum: 1 },
      },
    },
    {
      $match: {
        totalCount: { $gt: 1 },
      },
    },
  ])
  .forEach((doc) => {
    doc.duplicate.shift();
    db.task.deleteMany({ _id: { $in: doc.duplicate } });
  });
