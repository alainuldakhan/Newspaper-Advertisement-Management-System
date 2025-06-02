import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { FiLayers } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(VuiBox);

export default function DocCleanArchitecture() {
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
        <FiLayers size={24} color="#70e0ff" style={{ marginRight: 8 }} />
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          Clean Architecture Guidelines
        </VuiTypography>
      </MotionBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        Paper Verse server follows Uncle Bob’s <strong>Clean Architecture</strong>. Key rules:
      </VuiTypography>

      <VuiBox component="ul" pl={3} mb={3} sx={{ listStyleType: '"▸  "', "& li": { mb: 1 } }}>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Independence</strong>: Frameworks, DB, UI are implementation details at the edge.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Dependency Rule</strong>: Code dependencies always point <em>inwards</em> —
            outer layers know about inner, never vice-versa.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Use-cases</strong> (Application layer) are orchestration scripts, isolated from
            Web API, EF Core and other tech.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Domain layer</strong> holds pure business rules: entities, value objects,
            domain events, aggregates.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>MediatR + CQRS</strong> deliver use-case requests to handlers, keep controllers
            thin.
          </VuiTypography>
        </li>
      </VuiBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        <strong>Layer map:</strong>
      </VuiTypography>

      <VuiBox
        component="pre"
        sx={{
          color: "rgba(255,255,255,0.8)",
          background: "rgba(255,255,255,0.04)",
          p: 2,
          borderRadius: 2,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
{`Presentation (API)
────┐
    │ calls
Application  ← business workflows, CQRS handlers, DTOs
────┤
    │ depends on
Core       ← entities, VOs, domain services
────┤
    │ interfaces
Infrastructure ← EF Core, JWT, external services
────┘`}
      </VuiBox>

      <VuiTypography variant="body2" color="text" mt={3} mb={1}>
        <strong>Solution folders:</strong>
      </VuiTypography>

      <VuiBox
        component="pre"
        sx={{
          color: "rgba(255,255,255,0.8)",
          background: "rgba(255,255,255,0.04)",
          p: 2,
          borderRadius: 2,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
{`src/
 ┣ WebApi/              # Controllers, middlewares
 ┣ Application/      # CQRS, services, DTOs
 ┣ Core/             # Core business logic
 ┣ Infrastructure/   # DB, Auth, integrations`}
      </VuiBox>
      <VuiTypography variant="body2" color="text" mt={3}>
        Keep changes isolated: a modification in <em>Infrastructure</em> should never ripple into{" "}
        <em>Core</em>. That guarantees long-term maintainability. Startup Project: PaperVerse.WebApi.
      </VuiTypography>
    </>
  );
}
