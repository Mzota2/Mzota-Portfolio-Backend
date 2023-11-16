const express = require('express');
const router = express.Router();

const {
    createHome, updateHome, getHome, deleteHome,

    createAbout, updateAbout, getAbout, deleteAbout,

    createSkill, updateSkill, getSkill, deleteSkill,

    createProject, updateProject, getProject, deleteProject,

    createService, updateService, getService, deleteService,

    createContact, updateContact, getContact, deleteContact,

    createContactInfo, updateContactInfo, getContactInfo, deleteContactInfo,

    downloadResume

} = require('../Controllers/DOMController');

router.route('/portfolio/download').get(downloadResume)

router.route('/portfolio/home').post(createHome).get(getHome);
router.route('/portfolio/home/:id').put(updateHome).delete(deleteHome);


router.route('/portfolio/about').post(createAbout).get(getAbout);
router.route('/portfolio/about/:id').put(updateAbout).delete(deleteAbout);

router.route('/portfolio/skill').post(createSkill).get(getSkill);
router.route('/portfolio/skill/:id').put(updateSkill).delete(deleteSkill);

router.route('/portfolio/project').post(createProject).get(getProject);
router.route('/portfolio/project/:id').put(updateProject).delete(deleteProject);

router.route('/portfolio/service').post(createService).get(getService);
router.route('/portfolio/service/:id').put(updateService).delete(deleteService);

router.route('/portfolio/contact').post(createContact).get(getContact);
router.route('/portfolio/contact/:id').put(updateContact).delete(deleteContact);

router.route('/portfolio/contactInfo').post(createContactInfo).get(getContactInfo);
router.route('/portfolio/contactInfo/:id').put(updateContactInfo).delete(deleteContactInfo);
module.exports = router;