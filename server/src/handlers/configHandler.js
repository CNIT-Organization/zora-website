import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "../../data");

export const getConfigData = (fileName) => {
  const filePath = join(DATA_DIR, fileName);

  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return null;
  }
};

export const getAllConfigs = () => {
  return {
    pricing: getConfigData("pricing.json"),
    about: getConfigData("about.json"),
    contact: getConfigData("contact.json"),
    features: getConfigData("features.json"),
    testimonials: getConfigData("testimonials.json"),
  };
};
