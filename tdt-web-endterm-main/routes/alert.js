const express = require("express");

const alertController = require("../controllers/alertController");

const router = express.Router();

router.get("/", alertController.getAllAlerts);

router.get("/sections", alertController.renderAlertSections);

router.get("/sections/:sectionId", alertController.renderAlertsBySection);


router.get("/render", alertController.renderAlerts);

router.get("/render/:id/", alertController.renderAlertDetail);

router.get("/:id", alertController.getAlertDetail);


router.post("/create", alertController.createAlert);

router.post("/:id/update", alertController.updateAlert);

router.post("/:id/delete", alertController.deleteAlert);



module.exports = router;