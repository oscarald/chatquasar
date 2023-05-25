import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    
    password: {
        type: String,
        trim: true,
        required: true
    },
    
    }, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  userSchema.methods.verifyPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
  };

export default mongoose.model("User", userSchema);