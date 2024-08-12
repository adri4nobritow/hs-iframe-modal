import { hubspot, Button, Flex } from "@hubspot/ui-extensions";

// Define the extension to be run within the HubSpot CRM
hubspot.extend(({ crm, actions }) => {
  // Fetch the ticket properties, including 'cms_org_id'
  crm.fetch('ticket').then(ticket => {
    const cmsOrgId = ticket.properties['cms_org_id']; // Get the 'cms_org_id' property

    // If the property exists, open the iframe with the dynamic URL
    if (cmsOrgId) {
      const handleClick = () => {
        actions.openIframeModal({
          uri: `https://admin.prod.jeeves.vpn/admin/organizations/${cmsOrgId}`,
          height: 1000,
          width: 1000,
        });
      };

      // Render the button that triggers the modal
      return (
        <Flex direction="column" align="start" gap="medium">
          <Button type="submit" onClick={handleClick}>
            Open Organization Admin
          </Button>
        </Flex>
      );
    } else {
      // Handle case where 'cms_org_id' is not available
      return (
        <Flex direction="column" align="start" gap="medium">
          <Button type="submit" disabled>
            cms_org_id not found
          </Button>
        </Flex>
      );
    }
  });
});
