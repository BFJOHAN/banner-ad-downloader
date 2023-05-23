import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Col, Row, Button, Space } from "antd";
import axios from "axios";
import "./App.css";

const SERVER_URL = process.env.REACT_APP_API_URL;

function App() {
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    console.log("SERVER_URL------------>", SERVER_URL);
    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/main`, {
        URL: url,
        brand: brand,
      });

      setMessage(response.data);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div style={{ paddingTop: "150px" }}>
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
              addonBefore="URL:"
              placeholder="input URL"
              allowClear
              onChange={(e) => setUrl(e.target.value)}
            />

            <Input
              size="large"
              addonBefore="Brand:"
              placeholder="input brand"
              allowClear
              onChange={(e) => setBrand(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                icon={<SearchOutlined />}
                type="default"
                danger
                onClick={handleSubmit}
              >
                Download Banner Ads
              </Button>
            </div>
          </Space>
        </Col>
        <Col md={8}></Col>
      </Row>
      <Row>
        <Col md={8} />
        <Col md={8}>
          <h3 style={{ textAlign: "center" }}>
            <b>{message}</b>
          </h3>
        </Col>
        <Col md={8} />
      </Row>
    </div>
  );
}

export default App;
