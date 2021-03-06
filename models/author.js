var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    
    family_name: {type:String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

//Virtual for full name
AuthorSchema.virtual('date_of_birth_formatted').get(function(){
   //return JSON.stringify(this); 
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});
AuthorSchema.virtual('date_of_death_formatted').get(function(){
   //return JSON.stringify(this); 
    return this.date_of_birth ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});
AuthorSchema.virtual('name').get(function(){
    return this.family_name+', '+this.first_name;
    //return this.first_name;
});

AuthorSchema.virtual('lifespan').get(function(){
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});


AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/'+this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);