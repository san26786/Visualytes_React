import fs from "fs";
import path from "path";

export function getClients() {
  const folder = path.join(
    process.cwd(),
    "public/assets/jpng/clients"
  );

  const files = fs
    .readdirSync(folder)
    .filter((file) =>
      /\.(png|jpg|jpeg|webp|svg)$/i.test(file)
    );

  return files.map((file) => ({
    name: file
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " "),
    image: `/assets/jpng/clients/${file}`,
  }));
}