import { hubspot, Button, Flex, Text } from "@hubspot/ui-extensions";
import { useState, useEffect } from "react";

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ actions }) => (
  <CmsOrgIdComponent fetchProperties={actions.fetchCrmObjectProperties} actions={actions} />
));

const CmsOrgIdComponent = ({ fetchProperties, actions }) => {
  const [cmsOrgId, setCmsOrgId] = useState("");

  useEffect(() => {
    // Fetch the 'cms_org_id' property from the ticket
    fetchProperties(["cms_org_id"]).then(properties => {
      setCmsOrgId(properties.cms_org_id);
    }).catch(error => {
      console.error("Error fetching CMS Org ID:", error);
    });
  }, [fetchProperties]);

  const handleClick = () => {
    if (cmsOrgId) {
      actions.openIframeModal({
        uri: `https://www.example.com`,
        height: 1000,
        width: 1000,
      });
    }
  };

  return (
    <Flex direction="column" align="start" gap="medium">
      {cmsOrgId ? (
        <Button type="submit" onClick={handleClick}>
          Open Example.com
        </Button>
      ) : (
        <Text>CMS Org ID not found or loading...</Text>
      )}
    </Flex>
  );
};
