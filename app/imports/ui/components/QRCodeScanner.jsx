import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ZXing from '@zxing/library';
import { Button, Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const useCodeReader = () => useRef(new ZXing.BrowserQRCodeReader());

const QrCodeScanner = ({ onResultChange }) => {
  const codeReaderRef = useCodeReader();
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [isScanning, setIsScanning] = useState(true); // New state to control scanning
  // eslint-disable-next-line no-unused-vars
  const [result, setResult] = useState('');

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
          // eslint-disable-next-line no-use-before-define
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

  // eslint-disable-next-line no-shadow
  const decodeOnce = (codeReader, selectedDeviceId) => {
    if (isScanning) {
      setIsScanning(false); // Set to false before scanning to prevent rapid clicks
      // eslint-disable-next-line no-shadow
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

  if (!ZXing) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-1 justify-content-center align-content-center">
      <Row className="justify-content-center">
        <Col sm={3} md={4} lg={4} xl={4}>
          <Container className="py-2">
            <Row className="pb-3 d-flex">
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="startButton">Start</Button>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button className="button" id="resetButton">Reset</Button>
              </Col>
            </Row>

            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video id="video" width="350" height="350" style={{ border: '3px solid gray', background: 'gray' }} />
              </div>
            </Container>

            <Container className="py-1">
              <div id="sourceSelectPanel" style={{ display: 'none' }}>
                <label htmlFor="sourceSelect">
                  Video Source:
                  <select id="sourceSelect" style={{ maxWidth: '400px' }} aria-label="Video Source" />
                </label>
              </div>
            </Container>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

QrCodeScanner.propTypes = {
  onResultChange: PropTypes.func.isRequired,
};

export default QrCodeScanner;
