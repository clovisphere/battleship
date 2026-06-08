const CHARS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
const FONT_SIZE = 14;
const BG = "rgba(12, 26, 12, 0.05)";

let animId = null;
let resizeHandler = null;

export const startMatrix = (canvas) => {
  stopMatrix(canvas);

  const ctx = canvas.getContext("2d");
  const cols = () => Math.floor(canvas.width / FONT_SIZE);

  let drops = [];

  resizeHandler = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const n = cols();
    drops = Array.from({ length: n }, (_, i) => drops[i] ?? Math.floor(Math.random() * (canvas.height / FONT_SIZE)));
  };
  resizeHandler();
  window.addEventListener("resize", resizeHandler);

  const draw = () => {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px monospace`;

    drops.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillStyle = "#afffaf";
      ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);
      if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });

    animId = requestAnimationFrame(draw);
  };

  animId = requestAnimationFrame(draw);
};

export const stopMatrix = (canvas) => {
  if (animId) { cancelAnimationFrame(animId); animId = null; }
  if (resizeHandler) { window.removeEventListener("resize", resizeHandler); resizeHandler = null; }
  canvas?.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
};
