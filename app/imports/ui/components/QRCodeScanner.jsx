import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ZXing from '@zxing/library';
import { Button, Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const useCodeReader = () => useRef(new ZXing.BrowserQRCodeReader());

const QrCodeScanner = ({ onResultChange }) => {
  const codeReaderRef = useCodeReader();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null); // State to store selected device ID
  const [isScanning, setIsScanning] = useState(true); // New state to control scanning
  const [setResult] = useState('');

  useEffect(() => {
    const initCodeReader = async () => {
      try {
        const codeReader = new ZXing.BrowserQRCodeReader();

        const videoInputDevices = await codeReader.getVideoInputDevices();
        setSelectedDeviceId(videoInputDevices[0]?.deviceId);

        if (videoInputDevices.length >= 1) {
          const sourceSelect = document.getElementById('sourceSelect');
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option');
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });

          sourceSelect.onchange = () => {
            setSelectedDeviceId(sourceSelect.value);
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanel');
          sourceSelectPanel.style.display = 'block';
        }

        document.getElementById('startButton').addEventListener('click', () => {
          decodeOnce(codeReaderRef.current, selectedDeviceId);
        });

        document.getElementById('resetButton').addEventListener('click', () => {
          codeReaderRef.current.reset();
          setIsScanning(true); // Reset scanning state
          setResult('');
          document.getElementById('result').textContent = '';
        });

      } catch (error) {
        console.error(error);
      }
    };

    initCodeReader();
  }, [selectedDeviceId, codeReaderRef]);

  const decodeOnce = (codeReader, selectedDeviceId) => {
    if (isScanning) {
      setIsScanning(false); // Set to false before scanning to prevent rapid clicks
      codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
        if (result) {
          console.log('Found QR code!', result);
          setResult(result.text);
          document.getElementById('result').textContent = result.text;
          onResultChange(result.text);
        }

        if (err) {
          if (err instanceof ZXing.NotFoundException) {
            console.log('No QR code found.');
          }

          if (err instanceof ZXing.ChecksumException) {
            console.log('A code was found, but its read value was not valid.');
          }

          if (err instanceof ZXing.FormatException) {
            console.log('A code was found, but it was in an invalid format.');
          }
        }
      });
    }
  };

  return ZXing ? (
    <div className="p-1 justify-content-center align-content-center">
      <Row className="justify-content-center">
        <Col sm={3} md={4} lg={4} xl={4}>
          <Container className="py-2">
            <Row className="py-1 d-flex">
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="startButton">Start</Button>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="resetButton">Stop</Button>
              </Col>
            </Row>

            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                <video id="video" width="300" height="200" style={{ border: '1px solid gray' }} />
              </div>
            </Container>

            <Container className="py-2">
              <Row className="py-1 d-flex">
                <Col className="d-flex justify-content-center align-items-center">
                  <div id="sourceSelectPanel" style={{ display: 'none' }}>
                    <label htmlFor="sourceSelect">Change video input:
                      <select id="sourceSelect" aria-label="Select video input" />
                    </label>
                  </div>
                </Col>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

QrCodeScanner.propTypes = {
  onResultChange: PropTypes.func.isRequired,
};

export default QrCodeScanner;
