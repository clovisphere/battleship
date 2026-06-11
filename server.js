const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(import.meta.dir + path);
    if (await file.exists()) return new Response(file);
    return new Response("Not found", { status: 404 });
  },
});

const teal = (s) => `\x1b[36m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const art = [
  "         .──────────.",
  "        /     ★      \\",
  "       (──────────────)",
  "       | (o)  ──  ■  |",
  "       |  ──────────  |",
  "       |  ·  \\___/ ·  |",
  "        \\______________/",
  "",
  "  ╔═══╤═══╤═══╤═══╤═══╤═══╤═══╗",
  "  ║ ~ │ ~ │ ~ │ ~ │ ~ │ ~ │ ~ ║",
  "  ║ ~ │ ~ │ ~ │ ~ │ ~ │ ~ │ ~ ║",
  "  ║ ~ │ ~ │ ~ │ ~ │ ~ │ ~ │ ~ ║",
  "  ║ ~ │ ~ │ ~ │ ~ │ ~ │ ~ │ ~ ║",
  "  ╚═══╧═══╧═══╧═══╧═══╧═══╧═══╝",
].join("\n");

console.log(`
${teal(art)}

  ${bold("B L I P !")}  ${dim("— hunt the hidden beasts")}

  ${dim(`→  http://localhost:${server.port}`)}
`);
