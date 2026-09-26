import { Suspense } from "react";
import { OptionsTradeTerminal } from "@/components/dashboard/options/OptionsTradeTerminal";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function OptionsTradePage() {
  return (
    <Suspense fallback={<LoadingScreen label="Loading trade terminal…" />}>
      <OptionsTradeTerminal />
    </Suspense>
  );
}
