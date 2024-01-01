const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName:{
        type:String
    },
    projectDescription:{
        type:String
    },
    projectLiveLink:{
        type:String
    },

    projectGitHubLink:{
        type:String
    },
    projectComments:{
        type:Array
    },

    projectLikes:{
        defualt:0,
        type:Number
    },

    projectShares:{
        type:Number
    },
    projectImage:{
        type:String
    }


});


const ProjectModel = mongoose.model('project', projectSchema);
module.exports = ProjectModel;