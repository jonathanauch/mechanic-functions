export const handler = ({ inputs, mechanic, sketch }) => {
    const {text, image, color1 } = inputs;

    let img;
    let imgGraphic;
    let DIM = Math.min(window.innerWidth, window.innerHeight) - 30;
    let margin = DIM/24;
    let width = DIM;
    let height = DIM;


    sketch.preload = () => {
        if (image) {
          img = sketch.loadImage(URL.createObjectURL(image));
        }
      };

    sketch.setup = () => {
        sketch.createCanvas(width, height);
        if (img) {
            loadImage();
          }    };


    const loadImage = () => {
        imgGraphic = sketch.createGraphics(img.width, img.height);
        imgGraphic.image(img, 0, 0);
        imgGraphic.noStroke();
      };

      const drawRectangle = ({ rx, ry, rw, rh }) => {
        if (img) {
          const rectRatio = rw / rh;
          const imageRatio = imgGraphic.width / imgGraphic.height;
          const sw =
            rectRatio > imageRatio
              ? imgGraphic.width
              : imgGraphic.height * rectRatio;
              const sh =
              rectRatio > imageRatio
                ? imgGraphic.width / rectRatio
                : imgGraphic.height;
            const sx = (imgGraphic.width - sw) / 2;
            const sy = (imgGraphic.height - sh) / 2;
            sketch.image(imgGraphic, rx, ry, rw, rh, sx, sy, sw, sh);
        } else {
          sketch.rect(rx, ry, rw, rh);
        }
      };
      

  const drawRectangles = () => {
  
        drawRectangle({
          rx: width/2,
          ry: height/2,
          rw: width/2,
          rh: height/2,
        });
       
    }

    sketch.draw = () => {
        sketch.background("gray");
        sketch.noStroke();

        sketch.fill(color1);
        sketch.rect(0, 0, width / 2, height / 2);

        sketch.fill("#000000");
        sketch.textSize(DIM / 15);
        sketch.text(text, margin, margin + DIM/20);

        drawRectangles();

        mechanic.done();

    };
};

export const inputs = {
   
    image: {
        type: "image",
    },
    text: {
        type: "text",
        default: "follow @jonathan.auch",
    },
    color1: {
        type: "color",
        default: "#E94225",
        options: ['#E94225', 'blue', 'red'] 

    },

};



export const settings = {
    engine: require("@mechanic-design/engine-p5"),
};