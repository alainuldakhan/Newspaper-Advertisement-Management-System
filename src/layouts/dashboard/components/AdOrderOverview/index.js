import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import TimelineItem from "examples/Timeline/TimelineItem";

import { FaRegNewspaper, FaMoneyCheckAlt, FaEdit, FaEye, FaCheckCircle } from "react-icons/fa";
import palette from "assets/theme/base/colors";

function AdsOverview() {
  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Ads Overview
        </VuiTypography>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <FaCheckCircle color="green" size="15px" />
            <VuiTypography variant="button" color="text" fontWeight="medium" ml="5px" mr="2px">
              +12%
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              this week
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        <TimelineItem
          icon={<FaRegNewspaper size="16px" color={palette.info.main} />}
          title="New ad submitted by client"
          dateTime="06 MAY 09:00"
        />
        <TimelineItem
          icon={<FaEye size="16px" color={palette.warning.main} />}
          title="Editor reviewed ad #45213"
          dateTime="06 MAY 10:30"
        />
        <TimelineItem
          icon={<FaEdit size="16px" color={palette.error.main} />}
          title="Client updated ad content"
          dateTime="06 MAY 13:10"
        />
        <TimelineItem
          icon={<FaMoneyCheckAlt size="16px" color={palette.lightblue.main} />}
          title="Payment received for ad #45213"
          dateTime="06 MAY 15:40"
        />
        <TimelineItem
          icon={<FaCheckCircle size="16px" color={palette.success.main} />}
          title="Ad #45213 approved and scheduled"
          dateTime="06 MAY 16:00"
        />
      </VuiBox>
    </Card>
  );
}

export default AdsOverview;
