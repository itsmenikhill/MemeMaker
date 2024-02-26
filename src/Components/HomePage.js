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
    const canvas = await html2canvas(finalMeme);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = document.getElementById("meme-top-caption");
    if (textarea) {
      const width = textarea.offsetWidth;
      const currentHeight = textarea.clientHeight;
      // textarea.style.height =`${currentHeight + 40}px`;
    }
  };

  // const getImages = async (query) => {
  //   const apiKey = "";
  //   const searchEngineId = "";
  //   const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;
  //   const result = await axios.get(url);
  //   const imageUrl = result.data.items[1].pagemap.cse_image[0].src;
  //   // imageContainer.innerHTML = `<img src="${imageUrl}" alt="${query} meme">`;S
  //   return imageUrl;
  // };

  // const handleQuery = (event) => {
  //   setQuery(event.target.value);
  // };

  const handleFontSize = (value) => {
    const textToChange = document.getElementById("toptext");
    if (textToChange) {
      textToChange.style.fontSize=value;
    }
  };

  const handleFontChange = (value) => {
    const textToChange = document.getElementById("toptext");
    if (textToChange) {
      textToChange.style.fontFamily=value;
    }
  };

  return (
    <div className="main-content">
      <form>
        {/* <input
          type="text"
          id="query"
          value={query}
          onChange={handleQuery}
        ></input> */}
        {/* <Button
          onClick={() => {
            const imageUrl = getImages(query);
            <img 
              scr={imageUrl}
              alt={""}
            />
          }}
          variant="contained"
          className="button"
        >
          Search
        </Button> */}
      </form>
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
                  value={text}
                  onChange={handleTextChange}
                  className="toptext"
                  type="text"
                  name="toptext"
                  id="toptext"
                  placeholder="Enter your text"
                />
              </form>
              <img
                style={{
                  width: "100%",
                  cursor: "pointer",
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
                  <Button onClick={()=>handleFontSize("large")} variant="contained">
                    L
                  </Button>
                  <Button
                    onClick={()=>handleFontSize("x-large")}
                    variant="contained"
                  >
                    XL
                  </Button>
                  <Button
                    onClick={()=>handleFontSize("xx-large")}
                    variant="contained"
                  >
                    XXL
                  </Button>
                </div>
                <div className="fontButton">
                  <Button onClick={()=>handleFontChange("Roboto")} variant="contained">I</Button>
                  <Button onClick={()=>handleFontChange("Verdana")} variant="contained">I</Button>
                  <Button onClick={()=>handleFontChange("Comic Sans MS")} variant="contained">I</Button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
