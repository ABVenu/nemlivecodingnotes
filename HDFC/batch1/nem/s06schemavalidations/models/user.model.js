/// create Todo Schema 
/// This simple schema validation
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    /// unique is true
    email:{type:String, unique:true},
    /// name cannot be skipped
    // required true
    name:{type:String, required:true},
    /// min, max
    age:{type:Number, min:10,max:90},
    /// enum
    gender:{type:String, enum:["male", "female"]},
    isMarried:Boolean,
    // default
    country:{type:String, default:"India"},
    isMajor: {
    type: Boolean,
    validate: {
      validator: function (v) {
        // 'this' points to the document
        if (this.age >= 18) {
          return v === true;   // Must be true if age >= 18
        } else {
          return v === false;  // Must be false if age < 18
        }
      },
      message: props => 
        `isMajor should be true if age >= 18, and false if age < 18. Got ${props.value}`
    }
  },
  subjects:[{type:String}]
}
,{
    timestamps:true,
    versionKey:false
})

export const UserModel = mongoose.model("User", userSchema);

