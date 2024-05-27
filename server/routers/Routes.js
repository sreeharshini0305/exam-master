const express=require("express");
const router=express.Router();
router.use(express.json());
const Middleware=require('../Middleware/Middlewarecheck');
const {AdminRegister ,LoginUser,studentregister,recruiterregister,check,logout
,updateprofile}=require('../controllers/Controllers');
const {Addtest,mytestsdata,deletequestion,displayAllTests,testquestions, submittest,started_test,studentscores,liststds}=require('../controllers/Addtests');

router.post('/AdminRegister',AdminRegister)
router.post('/studentregister',studentregister)
router.post('/recruiterregister',recruiterregister)
router.get('/check',Middleware,check);
router.post('/updateprofile',Middleware,updateprofile);
router.post('/LoginUser',LoginUser);
router.get('/logout',logout)
router.post('/addtest',Middleware,Addtest);
router.get('/mytestsdata/:id',Middleware,mytestsdata);
router.get('/quesdel/:id',Middleware,deletequestion);
router.get('/displayAllTests',Middleware,displayAllTests);
router.post('/testquestions',Middleware,testquestions);
router.post('/submittest',Middleware,submittest);
router.post('/started_test',Middleware,started_test);
router.get('/scores/:studentid',Middleware,studentscores);
router.get('/liststds/:testid',Middleware,liststds);
module.exports=router;