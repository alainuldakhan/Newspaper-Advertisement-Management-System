import { useMemo } from "react";
import PropTypes from "prop-types";

import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    const pl = key === 0 ? 3 : 1;
    const pr = key === columns.length - 1 ? 3 : 1;

    return (
      <VuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        {name.toUpperCase()}
      </VuiBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => (
      <VuiBox
        key={`${rowKey}-${name}`}
        component="td"
        p={1}
        textAlign={align}
        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
      >
        <VuiTypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ display: "inline-block", width: "max-content" }}
        >
          {row[name]}
        </VuiTypography>
      </VuiBox>
    ));

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <VuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </VuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

Table.defaultProps = {
  columns: [],
  rows: [{}],
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
