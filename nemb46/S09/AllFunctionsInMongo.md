### **List Of All Functions Available In Mongo**

MongoDB provides a wide range of inbuilt functions and operators for performing operations on data. These are categorized into different groups based on their usage.

---

### **1. Query Operators**
Used in queries to filter documents based on conditions.

#### **Comparison Operators**
- `$eq`: Equal to
- `$ne`: Not equal to
- `$gt`: Greater than
- `$gte`: Greater than or equal to
- `$lt`: Less than
- `$lte`: Less than or equal to
- `$in`: Matches any value in an array
- `$nin`: Does not match any value in an array

#### **Logical Operators**
- `$and`: Logical AND
- `$or`: Logical OR
- `$not`: Logical NOT
- `$nor`: Logical NOR

#### **Element Operators**
- `$exists`: Checks if a field exists
- `$type`: Matches fields based on their BSON type

#### **Evaluation Operators**
- `$regex`: Matches a regular expression
- `$expr`: Allows the use of aggregation expressions in queries
- `$mod`: Modulus operation
- `$text`: Text search
- `$where`: Matches documents based on a JavaScript expression

---

### **2. Update Operators**
Used to update fields in documents.

#### **Field Update Operators**
- `$set`: Sets a field to a specified value
- `$unset`: Removes a field
- `$rename`: Renames a field
- `$inc`: Increments a field by a specified value
- `$mul`: Multiplies a field by a value
- `$min`: Updates the field if the specified value is less than the existing value
- `$max`: Updates the field if the specified value is greater than the existing value

#### **Array Update Operators**
- `$push`: Adds an element to an array
- `$pop`: Removes the first or last element from an array
- `$pull`: Removes elements from an array that match a condition
- `$addToSet`: Adds a value to an array only if it doesn’t already exist
- `$each`: Used with `$push` or `$addToSet` to add multiple elements
- `$slice`: Limits the number of elements in an array
- `$sort`: Sorts elements in an array

#### **Positional Operators**
- `$`: Updates the first array element that matches the query condition
- `$[]`: Updates all array elements
- `$[<identifier>]`: Updates array elements that match array filters

---

### **3. Aggregation Pipeline Operators**
Used in the aggregation framework for advanced data transformations.

#### **Pipeline Stages**
- `$match`: Filters documents
- `$group`: Groups documents by a specified key
- `$project`: Reshapes documents and includes/excludes fields
- `$sort`: Sorts documents
- `$limit`: Limits the number of documents
- `$skip`: Skips the specified number of documents
- `$unwind`: Deconstructs an array field
- `$lookup`: Performs a left outer join with another collection
- `$facet`: Processes multiple pipelines within a single stage
- `$bucket`: Categorizes documents into groups
- `$bucketAuto`: Automatically categorizes documents into groups
- `$replaceRoot`: Replaces the root document
- `$merge`: Merges the results of the pipeline into another collection

#### **Expression Operators**
- `$sum`: Calculates the sum of numeric values
- `$avg`: Calculates the average
- `$min`: Finds the minimum value
- `$max`: Finds the maximum value
- `$first`: Returns the first value
- `$last`: Returns the last value
- `$count`: Counts the number of documents
- `$concat`: Concatenates strings
- `$substr`: Extracts a substring
- `$toUpper`: Converts to uppercase
- `$toLower`: Converts to lowercase
- `$arrayElemAt`: Returns an element from an array
- `$size`: Returns the size of an array
- `$split`: Splits a string into an array

---

### **4. Array Operators**
Used to manipulate array fields.

- `$all`: Matches arrays that contain all specified elements
- `$elemMatch`: Matches documents containing an array with at least one element that matches the specified condition
- `$size`: Matches arrays with a specified number of elements

---

### **5. Text Search Operators**
- `$text`: Performs text search on a collection with a text index
- `$search`: The query string for text search
- `$language`: The language for the text search
- `$caseSensitive`: Enables case-sensitive search
- `$diacriticSensitive`: Enables diacritic-sensitive search

---

### **6. Geospatial Operators**
Used to perform queries on geospatial data.

- `$geoWithin`: Finds documents within a geometry
- `$geoIntersects`: Finds documents that intersect with a geometry
- `$near`: Finds documents near a point
- `$nearSphere`: Finds documents near a point on a sphere

---

### **7. Miscellaneous Operators**
- `$currentDate`: Sets a field to the current date
- `$type`: Matches fields based on their BSON type
- `$expr`: Allows aggregation expressions in queries
- `$jsonSchema`: Validates documents against a JSON schema

---

### **Resources for Full Reference**
For the latest and most comprehensive list of operators, refer to the [MongoDB documentation](https://www.mongodb.com/docs/manual/).

