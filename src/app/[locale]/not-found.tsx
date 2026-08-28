import { CorporateErrorView } from "@/components/common/CorporateErrorView";

export default function LocaleNotFound() {
  return <CorporateErrorView statusCode={404} />;
}
