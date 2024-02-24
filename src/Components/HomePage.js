import { React, useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import "./HomePage.css";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const handleOpen = (img) => {
    setOpen(true);
    setCurrentImage(img);
  };
  const handleClose = () => setOpen(false);

  const photos = [
    { src: "/images/akki.jpeg" },
    { src: "/images/amit.jpeg" },
    { src: "/images/sallu.jpeg" },
    { src: "/images/baghban.jpeg" },
    { src: "/images/delhibelly.jpeg" },
    { src: "/images/party.jpg" },
    { src: "/images/rajurao.jpg" },
    { src: "/images/clearbol.jpeg" },
    { src: "/images/srk.jpeg" },
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
              <form className="meme-top-caption">
                <textarea
                  className="toptext"
                  type="text"
                  name="toptext"
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
            <Button
              className="downloadButton"
              variant="contained"
              startIcon={<ArrowDownwardIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
