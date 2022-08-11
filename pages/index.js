import Head from "next/head";
import { CanvasClient, enhance } from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { resolveRenderer } from "../components/ResolveRenderer";
import { enhancers } from "../enhancers";

export default function Home({ composition }) {
  console.log("composition", composition);

  return (
    <div>
      <Head>
        <title>Uniform BigCommerce Cloudinary Shoppable Video</title>
      </Head>

      <div className="gallery-container">
        <h1>Uniform BigCommerce Cloudinary Shoppable Video</h1>
        <Composition data={composition} resolveRenderer={resolveRenderer}>
          <Slot name="video" />
        </Composition>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await client.getCompositionBySlug({
    slug: "home",
  });

  enhance({ composition, enhancers, context: {} });

  return {
    props: { composition },
  };
}
