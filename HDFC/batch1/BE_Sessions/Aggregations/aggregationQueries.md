```
db.students.aggregate([{$group:{_id:"$state", studentCount:{$sum:1}}}])
```
