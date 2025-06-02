import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { FiDatabase } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(VuiBox);

export default function DocDatabase() {
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
        <FiDatabase size={24} color="#4FC3F7" style={{ marginRight: 8 }} />
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          SQL Server & Entity Framework Core
        </VuiTypography>
      </MotionBox>
      <VuiTypography variant="body2" color="text" mb={1}>
        <strong>Storage stack used in Paper Verse:</strong>
      </VuiTypography>

      <VuiBox component="ul" pl={3} mb={3} sx={{ listStyleType: '"▸  "', "& li": { mb: 1 } }}>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Microsoft SQL Server 2022</strong> — primary transactional database.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Entity Framework Core 8</strong> with Code-First approach and Fluent API configs.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Zero-downtime <strong>EF Core Migrations</strong> executed on container start-up.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Unit of Work / Repository</strong> pattern hidden behind <em>IApplicationDbContext</em>.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Read-only projections</strong> (DTOs) via <code>AsNoTracking()</code> for speed.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Async LINQ queries, automatic <strong>retry on failure</strong> policy (Transient faults).
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Indexing strategy</strong>: clustered PK + composite non-clustered indexes on
            frequently filtered columns.
          </VuiTypography>
        </li>
      </VuiBox>
      <VuiBox
        component="pre"
        sx={{
          color: "rgba(255,255,255,0.85)",
          background: "rgba(255,255,255,0.04)",
          p: 2,
          borderRadius: 2,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
{`Server=db,1433;
Database=PaperVerse;
User Id=sa;
Password=Your_strong_password!;
TrustServerCertificate=true;`}
      </VuiBox>
      <VuiTypography variant="body2" color="text" mt={3} mb={1}>
        <strong>Infrastructure → Persistence layout:</strong>
      </VuiTypography>

      <VuiBox
        component="pre"
        sx={{
          color: "rgba(255,255,255,0.85)",
          background: "rgba(255,255,255,0.04)",
          p: 2,
          borderRadius: 2,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
{`Infrastructure/
 ┣ Persistence/
 ┃ ┣ Configurations/      # Fluent API per entity
 ┃ ┣ Migrations/          # EF Core generated scripts
 ┃ ┣ ApplicationDbContext.cs
 ┃ ┗ PersistenceServiceRegistration.cs
 ┗ …`}
      </VuiBox>
      <VuiTypography variant="body2" color="text" mt={3}>
        <strong>Tips:</strong> keep long-running read queries behind
        <code>ReadOnlyConnection</code>; enable <code>Query Store</code> in production to monitor
        regressions; always version migrations so deployments stay predictable.
      </VuiTypography>
    </>
  );
}
