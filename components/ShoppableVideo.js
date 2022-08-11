import dynamic from "next/dynamic";

export default function ShoppableVideo({ component }) {
  const DynamicVideo = dynamic(() => import("./VideoPlayer"), { ssr: false });

  //todo
  //1. fix the shoppable image stuff
  //2. the actions on click
  //3. how to move to the bigcommerce url on click

  const cta = component.parameters.cta.value;
  const { publicId } = component.parameters.cloudinary.value[0];
  const cloudname = "nefejames";

  let products = [];

  if (component.slots?.chapter) {
    products = component.slots.chapter.map((chapter) => {
      const { id, name, price, image } = chapter.parameters.product;
      const clickAction = { args: {} };
      console.log(image);

      clickAction.action = "goto";
      clickAction.pause = true;
      clickAction.args.url = "https://www.google.com";
      // https://uniform-shoppable.mybigcommerce.com/fog-linen-chambray-towel-beige-stripe/
      // console.log(clickAction);

      const result = {
        productId: id,
        productName: `${name} - ${price}`,
        startTime: Number(chapter.parameters.endTime.value),
        endTime: Number(chapter.parameters.endTime.value),
        onclick: clickAction,
        image: image,
        publicId: `https://res.cloudinary.com/nefejames/image/upload/v1632500955/Hackmamba/Images/pet9.jpg`,
      };
      // "https://res.cloudinary.com/nefejames/image/upload/v1632500955/Hackmamba/Images/pet9.jpg",

      console.log(result);
      return result;
    });
  }

  const options = {
    video: publicId,
    cloudname,
    products,
    cta,
  };

  return (
    <>
      <DynamicVideo {...options} />
    </>
  );
}
