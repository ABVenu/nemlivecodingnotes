```
db.students.aggregate([{$group:{_id:"$state", studentCount:{$sum:1}}}])
```
```
db.students.aggregate([{$group:{_id:"$gender", 
                                studentCount:{$sum:1}, 
                                minAge:{$min:"$age"},
                                maxAge:{$max:"$age"},
                                avgAge:{$avg:"$age"}
                       }}])
```
```
db.students.aggregate([{$unwind:"$courses"},
                       {$group:{_id:"$name", avgMarks:{$avg:"$courses.marks"}}}])
```
