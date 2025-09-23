```
1. db.students2.aggregate([{$group:{_id:"$state"}}])
2. db.students2.aggregate([{$group:{_id:"$state",count:{$sum:1}}}])
3. db.students2.aggregate([{$group:{_id:"$state",count:{$sum:1},avgAge:{$avg:"$age"}}}])
```
