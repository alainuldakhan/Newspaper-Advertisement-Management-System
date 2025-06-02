import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { FiDownloadCloud } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(VuiBox);
export default function DocInstallation() {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        display="flex"
        alignItems="center"
        mb={2}
      >
        <FiDownloadCloud size={24} color="#90caf9" style={{ marginRight: 8 }} />
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          Local Installation Guide
        </VuiTypography>
      </MotionBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        Follow these steps to run <strong>Paper&nbsp;Verse</strong> on your machine.
      </VuiTypography>
      <VuiBox component="ol" pl={3} mb={3} sx={{ "& li": { mb: 2 } }}>
        <li>
          <VuiTypography variant="body2" color="text">
            Clone the repository:&nbsp;
            <a
              href="https://github.com/alainuldakhan/Newspaper-Advertisement-Management-System"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/alainuldakhan/Newspaper-Advertisement-Management-System
            </a>
            .
          </VuiTypography>
          <VuiBox component="pre" fontSize={12} mt={1}>
{`https://github.com/alainuldakhan/Newspaper-Advertisement-Management-System.git`}
          </VuiBox>
        </li>

        <li>
          <VuiTypography variant="body2" color="text">
            Checkout branches:
          </VuiTypography>
          <VuiBox component="pre" fontSize={12} mt={1}>
{`git switch frontend   # React 18 + Vision UI
git switch backend    # ASP.NET Core 8 API`}
          </VuiBox>
        </li>

        <li>
          <VuiTypography variant="body2" color="text">
            Start SQL Server and API with&nbsp;<code>docker&nbsp;compose</code>:
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Configure the <strong>front-end ↔︎ API</strong> link:
          </VuiTypography>
          <VuiBox component="pre" fontSize={12} mt={1}>
{`# paper-verse/frontend/.env
REACT_APP_API_URL=http://localhost:5100`}
          </VuiBox>
        </li>

        <li>
          <VuiTypography variant="body2" color="text">
            Configure <strong>API ↔︎ SQL Server</strong> connection (Docker
            secrets override&nbsp;<code>appsettings.json</code>):
          </VuiTypography>
          <VuiBox component="pre" fontSize={12} mt={1}>
{`# paper-verse/backend/appsettings.json
"ConnectionStrings": {
  "Default":
  "Server=db,1433;Database=PaperVerse;User Id=sa;Password=Your_strong_password!;TrustServerCertificate=true"
}`}
          </VuiBox>
        </li>

        <li>
          <VuiTypography variant="body2" color="text">
            Install front-end dependencies and run dev server:
          </VuiTypography>
          <VuiBox component="pre" fontSize={12} mt={1}>
{`cd frontend/paper-verse
npm install
npm start`}
          </VuiBox>
        </li>
      </VuiBox>

      <VuiTypography variant="body2" color="text">
        🎯 Tip: use <code> for your interest, don't copy </code> 
      </VuiTypography>
    </>
  );
}
