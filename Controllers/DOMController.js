const HomeModel = require('../Models/Home');
const AboutModel = require('../Models/About');
const SkillModel = require('../Models/Skill');
const ProjectModel = require('../Models/Project');
const ServiceModel = require('../Models/Service');
const ContactModel = require('../Models/Contact');
const ContactInfoModel = require('../Models/ContactInfo');
const multer = require('multer');


//Multer for storage
//storage location
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file, callback)=>{
        callback(null, Date.now() +'-'+ file.originalname)
    }

});

const upload = multer({
    storage:Storage
}).single('photo');

//download resume

const downloadResume = async(req, res)=>{
    const foundDoc = await AboutModel.find();
    res.download(foundDoc[0].resume);
}

//Home Controller
//CreateHome UpdateHome DeleteHome GetHome

const createHome = async(req, res) =>{
    try {
        upload(req, res, async(err)=>{
            if(err){
                console.log(err);
            }

            const{hello, description} = req.body;

            const newHome = await HomeModel.create({
                hello,
                description,
                profileImage:req.file.path

            }).then(()=>{
                res.status(200).json('Home created successfully');
            }).catch((error)=>{
                console.log(error);
                res.sendStatus(400);
            })
        })


    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateHome = async(req, res)=>{
    try {

        upload(req, res, async(err)=>{
            if(err){
                console.log(err)
            }
            const {id} = req.params;
            const{hello, description, profileImage} = req.body;
            const foundHome = await HomeModel.findById({_id:id});
            console.log(req.file);
            if(foundHome){
                const updatedHome = await foundHome.updateOne({
                    hello:hello?hello:foundHome.hello,
                    description:description? description:foundHome.description,
                    profileImage: req.file?req.file.path:foundHome.profileImage
                }, {new:true});
    
                res.status(200).json(foundHome);
            }
        })
       
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteHome = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundHome = await HomeModel.findOneAndDelete({_id:id});
        if(foundHome){
            console.log('Home is found');

            await foundHome.deleteOne({_id:id});
            res.status(200).json({message:'Home deleted successfully', home:foundHome});
        }
        else{
            res.status(500).json({message:'home wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getHome = async(req, res) =>{
    try {
        const foundHome = await HomeModel.find();
        if(foundHome){
            res.json(foundHome);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}



//Skills section

const createAbout = async(req, res) =>{
    try {
        upload(req, res, async(err)=>{
            if(err){
                console.log(err);
            }

            const{ description} = req.body;

            const newHome = await AboutModel.create({
                description,
                resume:req.file.path

            }).then(()=>{
                res.status(200).json('About created successfully');
            }).catch((error)=>{
                console.log(error);
                res.sendStatus(400);
            })
        })
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateAbout = async(req, res)=>{
    try {
        upload(req, res, async(err)=>{
            if(err){
                console.log(err)
            }
            const {id} = req.params;
            const{description} = req.body;
            const foundAbout = await AboutModel.findById({_id:id});
            console.log(req.file);
            if(foundHome){
                const updatedHome = await foundAbout.updateOne({
                    description:description? description:foundAbout.description,
                    resume: req.file?req.file.path:foundAbout.resume
                }, {new:true});
    
                res.status(200).json(foundAbout);
            }
        })
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteAbout = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundAbout = await AboutModel.findOneAndDelete({_id:id});
        if(foundAbout){
            console.log('About is found');

            await foundAbout.deleteOne({_id:id});
            res.status(200).json({message:'About deleted successfully', About:foundAbout});
        }
        else{
            res.status(500).json({message:'About wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getAbout = async(req, res) =>{
    try {
        const foundAbout = await AboutModel.find();
        if(foundAbout.length){
            res.json(foundAbout);
        }
        else{
            res.json('About not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//Skills section

const createSkill = async(req, res) =>{
    try {

        upload(req, res, async(err)=>{
            if(err){
                console.log(err);
            }

            const{skillTitle, skillRating} = req.body;

            const newSkill = await SkillModel.create({
                skillTitle,
                skillRating,
            }).then(()=>{
                res.status(200).json('Skill created successfully');
            }).catch((error)=>{
                console.log(error);
                res.sendStatus(400);
            })
        })
        
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateSkill = async(req, res)=>{
    try {

        upload(req, res, async(err)=>{
            if(err){
                console.log(err)
            }
            const {id} = req.params;
            const{skillTitle, skillRating} = req.body;
            const foundSkill = await SkillModel.findById({_id:id});
            if(foundSkill){
                const updatedSkill = await foundSkill.updateOne({
                    skillTitle:skillTitle?skillTitle:foundSkill.skillTitle,
                    skillRating:skillRating?skillRating:foundSkill.skillRating,
                }, {new:true});
    
                res.status(200).json(foundSkill);
            }
        })
       
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteSkill = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundSkill = await SkillModel.findOneAndDelete({_id:id});
        if(foundSkill){
            console.log('Skill is found');

            await foundSkill.deleteOne({_id:id});
            res.status(200).json({message:'Skill deleted successfully', Skill:foundSkill});
        }
        else{
            res.status(500).json({message:'Skill wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getSkill = async(req, res) =>{
    try {
        const foundSkill = await SkillModel.find();
        if(foundSkill.length){
            res.json(foundSkill);
        }
        else{
            res.json('Skill not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//projects section

const createProject = async(req, res) =>{
    try {
        
        upload(req, res, async(error)=>{
            const{projectName, projectDescription, projectLiveLink, projectGitHubLink, projectComments, projectLikes, projectShares} = req.body;
            if(error){
                console.log(error);
            }

            const newProject = await ProjectModel.create({
                projectName,
                projectDescription,
                projectLiveLink,
                projectGitHubLink,
                projectShares,
                projectComments,
                projectLikes,
                projectImage:req.file.path
            }).then(()=>{
                res.status(200).json('Project created successfully');
            }).catch((error)=>{
                console.log(error);
                res.sendStatus(400);
            })
        })
        
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateProject = async(req, res)=>{
    try {
        upload(req, res, async(err)=>{
            const{projectName, projectDescription, projectLiveLink, projectGitHubLink, projectComments, projectLikes, projectShares} = req.body;
            if(err){
                console.log(err)
            }
            const {id} = req.params;
            const{description} = req.body;
            const foundProject = await ProjectModel.findById({_id:id});
            if(foundProject){
                const updatedProject= await foundProject.updateOne({
                    projectName:projectName?projectName:foundProject.projectName,
                    projectDescription:projectDescription?projectDescription:foundProject.projectDescription,
                    projectLiveLink:projectLiveLink?projectLiveLink:foundProject.projectLiveLink,
                    projectGitHubLink:projectGitHubLink?projectGitHubLink:foundProject.projectGitHubLink,
                    projectShares:projectShares?projectShares:foundProject.projectShares,
                    projectComments:projectComments?projectComments:foundProject.projectComments,
                    projectLikes:projectLikes?projectLikes:foundProject.projectLikes,
                    projectImage:req.file?req.file.path:foundProject.projectImage
                }, {new:true});
    
                res.status(200).json(foundProject);
            }
        })
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteProject = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundProject = await ProjectModel.findOneAndDelete({_id:id});
        if(foundProject){
            console.log('Project is found');

            await foundProject.deleteOne({_id:id});
            res.status(200).json({message:'Project deleted successfully', Project:foundProject});
        }
        else{
            res.status(500).json({message:'Project wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getProject = async(req, res) =>{
    try {
        const foundProject = await ProjectModel.find();
        if(foundProject.length){
            res.json(foundProject);
        }
        else{
            res.json('Project not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


//Services section

const createService = async(req, res) =>{
    try {
        const{serviceTitle, serviceDescription} = req.body;

        const newService = await ServiceModel.create({
            serviceTitle,
            serviceDescription,
        }).then(()=>{
            res.status(200).json('Service created successfully');
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(400);
        })
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateService = async(req, res)=>{
    try {
        const {id} = req.params;
        const{serviceTitle, serviceDescription} = req.body;
        const foundService = await ServiceModel.findById({_id:id});
        if(foundService){
            const updatedService = await foundService.updateOne({
                serviceTitle,
                serviceDescription,
            }, {new:true});

            res.status(200).json(foundService);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteService = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundService = await ServiceModel.findOneAndDelete({_id:id});
        if(foundService){
            console.log('Service is found');

            await foundService.deleteOne({_id:id});
            res.status(200).json({message:'Service deleted successfully', Service:foundService});
        }
        else{
            res.status(500).json({message:'Service wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getService = async(req, res) =>{
    try {
        const foundService = await ServiceModel.find();
        if(foundService.length){
            res.json(foundService);
        }
        else{
            res.json('Service not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//Contact section

const createContact = async(req, res) =>{
    try {
        const{contactEmail, contactName, contactPhone, contactMessage} = req.body;

        const newContact = await ContactModel.create({
            contactName,
            contactEmail,
            contactMessage,
            contactPhone
        }).then(()=>{
            res.status(200).json('Contact created successfully');
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(400);
        })
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateContact = async(req, res)=>{
    try {
        const {id} = req.params;
        const{contactEmail, contactName, contactPhone, contactMessage} = req.body;
        const foundContact = await ContactModel.findById({_id:id});
        if(foundContact){
            const updatedContact = await foundContact.updateOne({
                contactName,
                contactEmail,
                contactMessage,
                contactPhone
            }, {new:true});

            res.status(200).json(foundContact);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteContact = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundContact = await ContactModel.findOneAndDelete({_id:id});
        if(foundContact){
            console.log('Contact is found');

            await foundContact.deleteOne({_id:id});
            res.status(200).json({message:'Contact deleted successfully', Contact:foundContact});
        }
        else{
            res.status(500).json({message:'Contact wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getContact = async(req, res) =>{
    try {
        const foundContact = await ContactModel.find();
        if(foundContact.length){
            res.json(foundContact);
        }
        else{
            res.json('Contact not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//ContactInfo section

const createContactInfo = async(req, res) =>{
    try {
        const{contactLocation, contactEmail, contactPhone} = req.body;

        const newContactInfo = await ContactInfoModel.create({
            contactLocation,
            contactEmail,
            contactPhone
        }).then(()=>{
            res.status(200).json('ContactInfo created successfully');
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(400);
        })
        
    } catch (error) {
        console.log('Error: '+ error);
        res.sendStatus(500);
    }
}

const updateContactInfo = async(req, res)=>{
    try {
        const {id} = req.params;
        const{contactLocation, contactEmail, contactPhone} = req.body;
        const foundContactInfo = await ContactInfoModel.findById({_id:id});
        if(foundContactInfo){
            const updatedContactInfo = await foundContactInfo.updateOne({
                contactLocation,
                contactEmail,
                contactPhone
            }, {new:true});

            res.status(200).json(foundContactInfo);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        
    }

}

const deleteContactInfo = async(req, res) =>{
    try {
        const {id} = req.params;
        const foundContactInfo = await ContactInfoModel.findOneAndDelete({_id:id});
        if(foundContactInfo){
            console.log('ContactInfo is found');

            await foundContactInfo.deleteOne({_id:id});
            res.status(200).json({message:'ContactInfo deleted successfully', ContactInfo:foundContactInfo});
        }
        else{
            res.status(500).json({message:'ContactInfo wasnt found'})
        }

        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
}

const getContactInfo = async(req, res) =>{
    try {
        const foundContactInfo = await ContactInfoModel.find();
        if(foundContactInfo.length){
            res.json(foundContactInfo);
        }
        else{
            res.json('ContactInfo not found')
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}



module.exports = {
    createHome, updateHome, getHome, deleteHome,

    createAbout, updateAbout, getAbout, deleteAbout,

    createSkill, updateSkill, getSkill, deleteSkill,

    createProject, updateProject, getProject, deleteProject,

    createService, updateService, getService, deleteService,

    createContact, updateContact, getContact, deleteContact,

    createContactInfo, updateContactInfo, getContactInfo, deleteContactInfo,

    downloadResume

}
