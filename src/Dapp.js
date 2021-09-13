import Header from "./components/Header";
import Admin from "./components/Admin";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Dapp() {
  return (

    <div>
      <Header />
      <main>
        <Tabs align="center" variant="soft-rounded" colorScheme="teal" >
          <TabList >
            <Tab borderWidth="4px" m="1rem" fontSize="2xl">
              Admin
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={50}>
              <Admin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div>

  );
}

export default Dapp;