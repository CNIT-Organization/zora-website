import express from "express";
import { handleContactForm } from "../controllers/contactController.js";
import { handleB2BForm } from "../controllers/b2bController.js";
import { handleNewsletterSubscription } from "../controllers/newsletterController.js";
import { getConfigData, getAllConfigs } from "../handlers/configHandler.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

router.get("/config", (req, res) => {
  try {
    const config = getAllConfigs();
    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch configuration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.get("/config/:type", (req, res) => {
  try {
    const { type } = req.params;
    const data = getConfigData(`${type}.json`);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: `Configuration type '${type}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch configuration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

router.post("/contact", handleContactForm);

router.post("/b2b", handleB2BForm);

router.post("/newsletter", handleNewsletterSubscription);

export default router;
