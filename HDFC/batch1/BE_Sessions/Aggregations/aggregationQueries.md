### Count of Students State Wise
```
db.students.aggregate([{$group:{_id:"$state", studentCount:{$sum:1}}}])
```
### Count of Students Genderwise along min, max, avg age
```
db.students.aggregate([{$group:{_id:"$gender", 
                                studentCount:{$sum:1}, 
                                minAge:{$min:"$age"},
                                maxAge:{$max:"$age"},
                                avgAge:{$avg:"$age"}
                       }}])
```

### Avg Marks per Student
```
db.students.aggregate([{$unwind:"$courses"},
                       {$group:{_id:"$name", avgMarks:{$avg:"$courses.marks"}}}])
```
### Avg Marks per Student of Texas State
```
db.students.aggregate([{$match:{state:"Texas"}},
                       {$unwind:"$courses"},
                       {$group:{_id:"$name", avgMarks:{$avg:"$courses.marks"}}}]
```
