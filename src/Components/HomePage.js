import { React, useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import "./HomePage.css";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import domtoimage from "dom-to-image";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const handleOpen = (img) => {
    setOpen(true);
    setCurrentImage(img);
  };
  const handleClose = () => setOpen(false);
  const [query, setQuery] = useState("");

  const photos = [
    { src: "/images/akki.jpeg" },
    { src: "/images/amit.jpeg" },
    { src: "/images/sallu.jpeg" },
    { src: "/images/baghban.jpeg" },
    { src: "/images/delhibelly.jpeg" },
    { src: "/images/party.jpg" },
    { src: "/images/rajurao.jpg" },
    { src: "/images/clearbol.jpeg" },
    { src: "/images/Aage-ka-drama-sambhal-le.jpg" },
    { src: "/images/alia-bhatt-hitting-her-husband-from-behind.jpg" },
    { src: "/images/jaane-se-pehle-mujhe-milke-jaana.jpg" },
    { src: "/images/jesse.jpg" },
    { src: "/images/maut-aajaye-par-na-aaye.jpg" },
    { src: "/images/nawaz.jpg" },
    { src: "/images/ranveer.jpg" },
    { src: "/images/seh_lenge_thoda.webp" },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const handleDownload = async () => {
    const finalMeme = document.querySelector(".box");
    if (!finalMeme) return;

    const textarea = document.getElementById("toptext");
    const topText = textarea.value;

    // Use dom-to-image to capture the content, including text
    domtoimage
      .toPng(finalMeme)
      .then((dataUrl) => {
        // Create a temporary link and trigger a download
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "download.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  const [text, setText] = useState("");
  const [currentWidth, setCurrentWidth] = useState(0);
  let heightAdjusted = false;
  var [heightAdjustedCount, setHeightAdjustedCount] = useState(0);

  const handleTextChange = (event) => {
    setText(event.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const formArea = document.getElementById("meme-top-caption");
    const caption = document.getElementById("toptext");
    const offscreendiv = document.getElementById("offscreen-div");
    if (formArea && offscreendiv) {
      offscreendiv.textContent = caption.value;
      offscreendiv.style.fontFamily =
        window.getComputedStyle(caption).fontFamily;
      offscreendiv.style.fontSize = window.getComputedStyle(caption).fontSize;
      const contentWidth = offscreendiv.clientWidth;
      const width = formArea.offsetWidth;
      const currentHeight = formArea.clientHeight;
      if (heightAdjustedCount === 1) {
        setCurrentWidth(`${contentWidth - width}`);
        // console.log(currentWidth);
        // console.log(heightAdjustedCount);
        if (currentWidth > width) {
          formArea.style.height = `${currentHeight + 40}px`;
          setHeightAdjustedCount(heightAdjustedCount + 1);
          heightAdjusted = true;
        }
      } else if (!heightAdjusted) {
        setCurrentWidth(contentWidth - (width * heightAdjustedCount - 2));
        console.log(currentWidth);
        console.log(contentWidth);
        console.log(width * heightAdjustedCount - 1);
        if (currentWidth > width) {
          setHeightAdjustedCount(heightAdjustedCount + 1);
          heightAdjusted = true;
        }
      }
    }
  };

  const handleFontSize = (value) => {
    const textToChange = document.getElementById("toptext");
    if (textToChange) {
      textToChange.style.fontSize = value;
    }
  };

  const handleFontChange = (value) => {
    const textToChange = document.getElementById("toptext");
    if (textToChange) {
      textToChange.style.fontFamily = value;
    }
  };

  return (
    <div className="main-content">
      <div className="content">
        {photos.map((image, index) => (
          <div className="image-holder" key={image.src}>
            <img
              style={{
                width: "100%",
                cursor: "pointer",
                height: "100%",
              }}
              alt={index}
              src={image.src}
              role="presentation"
              onClick={() => handleOpen(image.src)}
            />
          </div>
        ))}
      </div>
      <Modal
        className="modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="box">
              <form id="meme-top-caption" className="meme-top-caption">
                <textarea
                  style={{
                    "overflow":"hidden"
                  }}
                  value={text}
                  onChange={handleTextChange}
                  className="toptext"
                  type="text"
                  name="toptext"
                  id="toptext"
                  placeholder="Enter your text"
                />
                <div className="offscreen-div" id="offscreen-div"></div>
              </form>
              <img
                style={{
                  width: "100%",
                  // cursor: "pointer",
                  height: "100%",
                }}
                src={currentImage}
                alt={""}
              />
            </div>
            <div className="buttons">
              <Button
                className="downloadButton"
                variant="contained"
                startIcon={<ArrowDownwardIcon />}
                onClick={handleDownload}
              >
                Download
              </Button>
              <div>
                <div className="fontButton">
                  <Button
                    onClick={() => handleFontSize("large")}
                    variant="contained"
                  >
                    L
                  </Button>
                  <Button
                    onClick={() => handleFontSize("x-large")}
                    variant="contained"
                  >
                    XL
                  </Button>
                  <Button
                    onClick={() => handleFontSize("xx-large")}
                    variant="contained"
                  >
                    XXL
                  </Button>
                </div>
                <div className="fontButton">
                  <Button
                    onClick={() => handleFontChange("Roboto")}
                    variant="contained"
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => handleFontChange("Verdana")}
                    variant="contained"
                  >
                    2 
                  </Button>
                  <Button
                    onClick={() => handleFontChange("Comic Sans MS")}
                    variant="contained"
                  >
                    3
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
