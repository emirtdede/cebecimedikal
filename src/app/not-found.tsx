import { CorporateErrorView } from "@/components/common/CorporateErrorView";

export default function NotFound() {
  return <CorporateErrorView statusCode={404} locale="tr" />;
}
