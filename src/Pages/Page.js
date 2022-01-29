import React, { useState } from 'react';
import ListCwTable from "../containers/ListCwTable";
import TableSidePanel from "../components/common/TableSidePanel";
import { Column, Grid, Row } from 'carbon-components-react';

const Page = () => {

  
    
  const [sidePanelResource, setSidePanelResource] = useState(null);
 
  const onClick = (element) => {
    console.log('on Click on Page')
  }
      
  return (
    <div>
      
      <TableSidePanel
            resource={sidePanelResource}
            onClose={() => setSidePanelResource(null)}
            onClick={onClick}
        />
      <Grid narrow>
         <Row>
            <Column className='bx--col-padding'>
              <h2>List of crosswords</h2>
              <ListCwTable
                onClick={onClick}
                onMoreDetails={(resource) => {
                  setSidePanelResource(resource);
              }}
              />
           </Column>
          </Row>
      </Grid>
    </div>
  );
};

export default Page;
