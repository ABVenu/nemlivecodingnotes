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
