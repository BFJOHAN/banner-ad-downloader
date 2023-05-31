import React, { useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Col, Row, Button, Space, notification, Modal } from "antd";
import axios from "axios";
import "./App.css";

const SERVER_URL = process.env.REACT_APP_API_URL;

function App() {
  const [brand, setBrand] = useState("");
  const [dropBoxKey, setDropBoxKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const searchSubmit = async (e) => {
    e.preventDefault();
    if (!dropBoxKey || !brand) {
      openNotificationWithIcon("warning");
      return;
    }
    try {
      openNotificationWithIcon("info");
      const response = await axios.post("http://localhost:5000/api/v1/main", {
        brand: brand,
        apikey: dropBoxKey,
      });
      openNotificationWithIcon("success", response.data);
    } catch (error) {
      openNotificationWithIcon("error");
    }
  };

  const insertDropboxKey = async (e) => {
    e.preventDefault();
    if (!dropBoxKey) {
      openNotificationWithIcon("warning");
      return;
    }
    setModalVisible(false);
  };

  const isOpenModal = async (e) => {
    e.preventDefault();
    setModalVisible(~modalVisible);
  };

  const openNotificationWithIcon = (type, state) => {
    if (type === "warning")
      notification["warning"]({
        message: "Warning!",
        description: "Please insert Dropbox api Key or Brand Name.",
        duration: 0,
      });
    if (type === "info")
      notification["info"]({
        message: "Processing...",
        description: "Please wait for a while.",
        duration: 3,
      });
    if (type === "success")
      notification["success"]({
        message: "Success!",
        description: state,
        duration: 2,
      });
    if (type === "error")
      notification["error"]({
        message: "Error!",
        description: "Expired token error! Please insert new Dropbox API key!",
        duration: 3,
      });
  };

  return (
    <div style={{ paddingTop: "300px" }}>
      <Row>
        <Col md={8} />
        <Col md={8}>
          <h1 style={{ textAlign: "center" }}>Banner Ad Downloader</h1>
        </Col>
        <Col md={8} />
      </Row>

      <Row>
        <Col md={8} />
        <Col md={8}>
          <Space direction="vertical" size="large" style={{ display: "flex" }}>
            <Input
              size="large"
              addonBefore="Brand:"
              placeholder="input brand"
              allowClear
              onChange={(e) => setBrand(e.target.value)}
            />
            <Row>
              <Col
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={isOpenModal}
                >
                  Insert Dropbox Key
                </Button>
              </Col>
              <Col
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  icon={<SearchOutlined />}
                  type="default"
                  danger
                  onClick={searchSubmit}
                >
                  Download Banner Ads
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
        <Col md={8}></Col>
        <Modal
          open={modalVisible}
          title="DROPBOX API KEY"
          centered
          onOk={insertDropboxKey}
          onCancel={isOpenModal}
          footer={[
            <Button key="back" type="default" danger onClick={isOpenModal}>
              Cancel
            </Button>,
            <Button key="submit" type="default" onClick={insertDropboxKey}>
              Insert
            </Button>,
          ]}
        >
          <Input
            size="medium"
            addonBefore="API Key:"
            placeholder="Please insert your Dropbox API Key..."
            allowClear
            onChange={(e) => setDropBoxKey(e.target.value)}
          />
        </Modal>
      </Row>
    </div>
  );
}

export default App;
