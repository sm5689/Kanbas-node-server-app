// import db from "../Database/index.js";
// function ModuleRoutes(app) {

//   var lessons = [{
//     "_id": "L2001",
//     "name": "LEARNING OBJECTIVES",
//     "description": "A brief history of rocketry and space exploration.",
//     "module": "M101"
//   },
//   {
//     "_id": "L2002",
//     "name": "Learn how to create user interfaces with HTML",
//     "description": "Basic principles of rocket propulsion.",
//     "module": "M101"
//   }];

//     app.delete("/api/modules/:mid", (req, res) => {
//         const { mid } = req.params;
//         db.modules = db.modules.filter((m) => m._id !== mid);
//         res.sendStatus(200);
//       });
    

//   app.post("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const newModule = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//       lessons: lessons
//     };
//     db.modules.push(newModule);
//     res.send(newModule);
//   });

//   app.get("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const modules = db.modules.filter((m) => m.course === cid);
//     res.send(modules);
//   });

//   app.put("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     const moduleIndex = db.modules.findIndex(
//       (m) => m._id === mid);
//     db.modules[moduleIndex] = {
//       ...db.modules[moduleIndex],
//       ...req.body
//     };
//     res.sendStatus(204);
//   });

//   app.delete("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     db.modules = db.modules.filter((m) => m._id !== mid);
//     res.sendStatus(200);
//   });


// }



import * as dao from "./dao.js";

function ModuleRoutes(app) {

  const createModule = async (req, res) => {
    const { cid } = req.params;
    const module = await dao.createModule(cid, req.body);
    res.json(module);
  }

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  }

  const findAllModules = async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  }

  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.moduleId);
    res.json(module);
  }

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  }

  const findModuleforCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModuleforCourse(courseId);
    console.log(modules);
    res.json(modules);
  }

  app.post("/api/courses/:cid/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.get("/api/modules", findAllModules);
  app.get("/api/modules/:moduleId", findModuleById);
  app.put("/api/modules/:moduleId", updateModule);
  app.get("/api/courses/:courseId/modules", findModuleforCourse);

}
export default ModuleRoutes;