import React from "react";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";
import { SiDotnet } from "react-icons/si";
import { motion } from "framer-motion";

const MotionBox = motion(VuiBox);

export default function BackendDocs() {
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
        <SiDotnet size={24} color="#512BD4" style={{ marginRight: 8 }} />
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          ASP&nbsp;.NET Core API Stack
        </VuiTypography>
      </MotionBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        <strong>Main technologies and conventions used on the server side:</strong>
      </VuiTypography>

      <VuiBox
        component="ul"
        pl={3}
        mb={3}
        sx={{ listStyleType: '"▸  "', "& li": { mb: 1 } }}
      >
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>ASP.NET Core 7</strong> – lightweight, cross-platform Web API.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Clean Architecture</strong> folder layout (<code>Domain → Application → Infrastructure → API</code>).
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>MediatR</strong> – CQRS &amp; in-process messaging for handlers.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>Entity Framework Core</strong> with PostgreSQL provider and fluent migrations.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>FluentValidation</strong> – declarative request validation.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            <strong>AutoMapper</strong> – DTO ↔︎ domain mapping.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            JWT Bearer auth with <strong>Identity</strong> &amp; <em>role-based</em> policies.
          </VuiTypography>
        </li>
        <li>
          <VuiTypography variant="body2" color="text">
            Interactive docs via <strong>Swagger / Swashbuckle</strong>.
          </VuiTypography>
        </li>
      </VuiBox>

      <VuiTypography variant="body2" color="text" mb={1}>
        <strong>API solution structure:</strong>
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
 ┣ Api/                     # Controllers, filters, middlewares
 ┣ Application/             # CQRS handlers, validators, DTOs
 ┣ Core/                    # Entities, enums, value objects
 ┣ Infrastructure/          # EF Core, external services, JWT provider`}
      </VuiBox>

      <VuiTypography variant="body2" color="text" mt={3}>
        For local run:&nbsp;
        <code>git clone repository name</code>. And then apply migrations;
      </VuiTypography>
    </>
  );
}
