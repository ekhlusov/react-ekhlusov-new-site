import React from "react";
import Sidebar from "./components/Sidebar";
import RightContainer from "./components/RightContainer";
import { useFetch } from "./components/helpers/hooks";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { DataContext } from "./components/helpers/data-context";
import StickyBox from "react-sticky-box";
import { ClipLoader } from "react-spinners";
import FloatingButton from "./components/FloatingButton";

const App = () => {
  const TOKEN = process.env.REACT_APP_MK_TOKEN;
  const GET_USER_URL =
    "https://api.moikrug.ru/v1/integrations/users/ekhlusov?access_token=" +
    TOKEN;

  //const GET_USER_URL = "https://ekhlusov.ru/ekhlusov.json";

  const [data, loading] = useFetch(GET_USER_URL);

  if (loading) {
    return (
      <div className="loading-bar">
        <ClipLoader sizeUnit={"px"} size={50} color={"#4e4e4e"} />
      </div>
    );
  }

  return (
    <>
      <Container className="main">
        <DataContext.Provider value={data}>
          <Row>
            <Col md="4">
              <StickyBox
                offsetTop={10}
                offsetBottom={10}
                className="sticky-block"
              >
                <Sidebar />
              </StickyBox>
            </Col>

            <Col className="right-container">
              <RightContainer />
            </Col>
          </Row>
        </DataContext.Provider>
      </Container>
      <FloatingButton />
    </>
  );
};

export default App;
