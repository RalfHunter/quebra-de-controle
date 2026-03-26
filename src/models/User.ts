import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

class User {
    model:mongoose.Model<any>
    constructor() {
        const userSchema = new Schema({
            email:{type: String, required:true, unique:true},
            name: {type:String, required:true},
            password: {type: String, required: true},
            cpf: {type: String, required:true, unique:true},
            birth_date: {type:Date, required: true},
            phone:{type: String, required: true, unique:true}
        },
            {
                timestamps:
                {
                    createdAt: "created_at",
                    updatedAt: 'updated_at'
                }
            }

        )
        userSchema.plugin(mongoosePaginate)
        this.model = mongoose.model('Users', userSchema)
    }
}

export default new User().model