import React, { useState } from "react";
import { Link, Tab, Tabs } from "carbon-components-react";
import { SidePanel } from "@carbon/ibm-products";
import handleEnterKey from "./handleEnterKey";

const TableSidePanel = (props) => {
  const { resource, onClose, onClick } = props;

  const [selectedTab, setSelectedTab] = useState(0);

  const headerSection = (
    <div>
      <div className="sidepanel__resource">
        <div className="sidepanel__resource-title">
          {resource?.icon}
          <div className="sidepanel__resource-title-text">
            <Link
              className={"table__link"}
              tabIndex="0"
              onClick={() => onClick(resource)}
              onKeyDown={(e) => handleEnterKey(e)}
            >
              {resource?.name}
            </Link>
          </div>
        </div>
      </div>
      <Tabs className="header__tabs" selected={selectedTab}>
        <Tab
          id="PropertiesTab"
          label="resource properties"
          title="resource properties"
          onClick={() => setSelectedTab(0)}
        >
          {" "}
          <div className="sidepanel__tab-content">resource properties</div>
        </Tab>
        <Tab
          id="TagsTab"
          label="Tags tab"
          disabled={false}
          title="Tags tab"
          onClick={() => setSelectedTab(1)}
        >
          <div className="sidepanel__tab-content--tags">Tags</div>
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <SidePanel
      title=" Grid details"
      subtitle="Specify detailed info on the grid"
      open={resource ? true : false}
      onRequestClose={onClose}
      selectorPageContent="#cw-table"
      includeOverlay={true}
      size={"lg"}
    >
      {headerSection}
    </SidePanel>
  );
};

export default TableSidePanel;
