import ServiceDynamicPage, { generateMetadata, generateStaticParams } from "../../archives/services/[slug]/page";

export const revalidate = 3600;

export { generateMetadata, generateStaticParams };
export default ServiceDynamicPage;
