import { setPreviewData, redirectToPreviewURL } from "@prismicio/next";

export default async function handler(req, res) {
  await setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res });
}
