const { Schema, model } = require('mongoose');

const devSchema = new Schema({
    nome:{
        type:String,
        required:true
    },
    github_user:{
        type:String,
        required:true
    },
    github_bio:String,
    github_avatar:{
        type:String,
        required:true
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {timestamps:true});

module.exports = model('Dev', devSchema);
